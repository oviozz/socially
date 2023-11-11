
import {useEffect, useRef, useState} from "react";
import {getAllPosts, getUserPosts} from "../../Functions/FireBaseFunctions.jsx";
import CardText from "../../Components/Card/CardText.jsx";
import CardPic from "../../Components/Card/CardPic.jsx";
import CardSkeleton from "../../Components/Card/CardSkeleton.jsx";

function ProfileFetchData({userID}){

    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    const isMounted = useRef(true);

    useEffect(() => {
        const unsubscribe = getUserPosts(userID,(updatedPosts) => {

            if (isMounted.current) {
                setPosts(updatedPosts);
                setIsLoading(false);
            }
        });

        return () => {

            isMounted.current = false; // Mark the component as unmounted
            if (unsubscribe && typeof unsubscribe === 'function') {
                unsubscribe();
            }
        };
    }, [userID]);


    if (posts.length === 0){
        return <h1 className={"flex justify-center items-center "}>No Post </h1>
    }
    const renderPosts = () => {

        const sortedDate = posts.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        return sortedDate;
    };


    const renderPostComponents = () => {

        return renderPosts().map((post) => {
            const key = post.postID;
            return post.image.length === 0 ? (
                <CardText key={key} wtype={"minWidth"} widthSize={550} postData={post} />
            ) : (
                <CardPic key={key} wtype={"minWidth"} widthSize={550} postData={post} />
            );
        });
    };

    if (isLoading) {
        return (
            <div className={"opacity-30 grid grid-cols-1 gap-4 sm:grid-cols-2"}>
                <CardSkeleton wtype={"maxWidth"} widthSize={300} />
                <CardSkeleton wtype={"maxWidth"} widthSize={300} />
                <CardSkeleton wtype={"maxWidth"} widthSize={300} />
                <CardSkeleton wtype={"maxWidth"} widthSize={300} />
                <CardSkeleton wtype={"maxWidth"} widthSize={300} />
            </div>
        );
    }

    return (
        <div className={"flex flex-col gap-5 w-full animate-fade-down"}>
            {renderPostComponents()}
        </div>
    );

}


export default ProfileFetchData;