
import { collection, addDoc, getDoc, doc, setDoc, getDocs, onSnapshot, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from "../FireBase/Config.jsx";
import {getUserAuth} from "../FireBase/AuthFunctions.jsx";

export async function addPostforUser(userID, userName, description, image, profileImage) {

    const userInfo = getUserAuth();
    const timestamp = new Date().toISOString();
    const userPostsCollection = collection(doc(db, "posts", userID), "user_posts"); // Use subcollection for user posts

    try {
        // Create the user document if it doesn't exist or update it
        await setDoc(doc(db, "posts", userID), {}, { merge: true });

        const imageURL = image ? await uploadImage(userID, image) : ""

        const newPostData = {
            userUid: userInfo.uid,
            username: userName,
            description: description,
            timestamp: timestamp,
            postLocation: userInfo.location,
            postImage: profileImage,
            likes: [],
            image: imageURL,
            comments: [

            ],
        };

        const newPostDocRef = await addDoc(userPostsCollection, newPostData);

        console.log('Post added to Firestore successfully with ID: ', newPostDocRef.id);
    } catch (error) {
        console.error('Error adding post to Firestore: ', error);
    }
}


async function uploadImage(userID, imageBlob) {

    const storage = getStorage();
    const storageRef = ref(storage, `images/${userID}/${Date.now()}`); // Define the storage path

    try {
        await uploadBytes(storageRef, imageBlob); // Upload the image blob
        const imageURL = await getDownloadURL(storageRef); // Get the download URL

        return imageURL;
    } catch (error) {
        console.error('Error uploading image: ', error);
        return null;
    }
}

export async function getAllPosts(callback) {
    try {
        const allPosts = [];

        const usersCollection = collection(db, "posts");

        const unsubscribe = onSnapshot(usersCollection, (usersQuerySnapshot) => {
            usersQuerySnapshot.docChanges().forEach((change) => {
                const userID = change.doc.id;
                const userPostsCollection = collection(usersCollection, userID, "user_posts");

                onSnapshot(userPostsCollection, (userPostsQuerySnapshot) => {
                    const userPosts = [];

                    userPostsQuerySnapshot.forEach((postDoc) => {
                        // Get the post data and add it to the userPosts array
                        const postData = postDoc.data();
                        userPosts.push({
                            postID: postDoc.id,
                            ...postData,
                        });
                    });

                    // Update or add userPosts to allPosts array with userID
                    const index = allPosts.findIndex((user) => user.userID === userID);
                    if (index === -1) {
                        allPosts.push({
                            userID,
                            posts: userPosts,
                        });
                    } else {
                        allPosts[index].posts = userPosts;
                    }

                    callback([...allPosts]); // Notify the component with the updated data
                });
            });
        });

        return unsubscribe;
    } catch (error) {
        console.error('Error retrieving posts: ', error);
        return () => {};
    }
}

export function getUserPosts(userID, callback) {
    try {
        const userPosts = [];

        const userPostsCollection = collection(db, "posts", userID, "user_posts");
        const unsubscribe = onSnapshot(userPostsCollection, (userPostsQuerySnapshot) => {
            const userPosts = [];

            userPostsQuerySnapshot.forEach((postDoc) => {
                // Get the post data and add it to the userPosts array
                const postData = postDoc.data();
                userPosts.push({
                    postID: postDoc.id,
                    ...postData,
                });
            });

            callback(userPosts);
        });

        return unsubscribe;
    } catch (error) {
        console.error('Error retrieving user posts: ', error);
    }
}


export async function deletePost(userID, postID) {
    try {
        const postDocRef = doc(db, "posts", userID, "user_posts", postID);
        await deleteDoc(postDocRef);
        console.log('Post deleted successfully:', postID);
    } catch (error) {
        console.error('Error deleting post:', error);
    }
}

export async function likePost(userID, postID) {
    try {
        const userInfo = getUserAuth();

        const postDocRef = doc(db, "posts", userID, "user_posts", postID);

        const postDoc = await getDoc(postDocRef);
        const postData = postDoc.data();

        const isLiked = postData.likes.includes(userInfo.displayName);

        if (isLiked) {
            const updatedLikes = postData.likes.filter((like) => like !== userInfo.displayName);
            await setDoc(postDocRef, { likes: updatedLikes }, { merge: true });
            console.log(`Post unliked successfully by ${userInfo.displayName}`);

        } else {
            const updatedLikes = [...postData.likes, userInfo.displayName];
            await setDoc(postDocRef, { likes: updatedLikes }, { merge: true });
            console.log(`Post liked successfully by ${userInfo.displayName}`);
        }
    } catch (error) {
        console.error('Error toggling like:', error);
    }
}

export async function writeComment(userID, postID, commentText) {
    try {
        const userInfo = getUserAuth();
        const timestamp = new Date().toISOString();

        const postDocRef = doc(db, "posts", userID, "user_posts", postID);

        const postDoc = await getDoc(postDocRef);
        const postData = postDoc.data();

        const newComment = {
            profile: userInfo.photoURL, // Assuming there's a photoURL in the user info
            username: userInfo.displayName,
            text: commentText,
            timestamp: timestamp,
            uid: userInfo.uid
        };

        const updatedComments = [...postData.comments, newComment];

        await setDoc(postDocRef, { comments: updatedComments }, { merge: true });
        console.log(`Comment added successfully by ${userInfo.displayName}`);

    } catch (error) {
        console.error('Error writing comment:', error);
    }
}

export async function deleteComment(userID, postID, commentIndex) {
    try {
        const postDocRef = doc(db, "posts", userID, "user_posts", postID);

        const postDoc = await getDoc(postDocRef);
        const postData = postDoc.data();

        if (commentIndex >= 0 && commentIndex < postData.comments.length) {
            const updatedComments = [...postData.comments];
            updatedComments.splice(commentIndex, 1);

            await setDoc(postDocRef, { comments: updatedComments }, { merge: true });
            console.log(`Comment deleted successfully at index ${commentIndex}`);
        } else {
            console.error('Invalid comment index');
        }
    } catch (error) {
        console.error('Error deleting comment:', error);
    }
}
