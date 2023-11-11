
import {useEffect, useRef, useState} from "react";
import CardText from "../../Components/Card/CardText.jsx";
import CardPic from "../../Components/Card/CardPic.jsx";
import { getAllPosts } from "../../Functions/FireBaseFunctions.jsx";
import CardSkeleton from "../../Components/Card/CardSkeleton.jsx";
import {getUserAuth} from "../../FireBase/AuthFunctions.jsx";

function HomeFetchData() {

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const isMounted = useRef(true);

    useEffect(() => {
        const unsubscribe = getAllPosts((updatedPosts) => {

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
    }, []);

    const renderPosts = () => {
        const allPosts = posts.reduce((allPosts, user) => allPosts.concat(user.posts), []);
        allPosts.sort((a, b) => {
            return new Date(b.timestamp) - new Date(a.timestamp);
        });

        return allPosts;
    };

    const renderPostComponents = () => {
        return renderPosts().map((post) => {
            const key = post.postID;
            return post.image.length === 0 ? (
                <CardText key={key} widthSize={800} wtype={"minWidth"} postData={post}/>
            ) : (
                <CardPic key={key} widthSize={800} wtype={"minWidth"} postData={post}/>
            );
        });
    };

    if (isLoading) {
        return (
            <div className={"opacity-30 flex flex-col items-center gap-5"}>
                <CardSkeleton wtype={"minWidth"} widthSize={800} />
                <CardSkeleton wtype={"minWidth"} widthSize={800} />
                <CardSkeleton wtype={"minWidth"} widthSize={800} />
            </div>
        );
    }

    return renderPostComponents();
}

export default HomeFetchData;
