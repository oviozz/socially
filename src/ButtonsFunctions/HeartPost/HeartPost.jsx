
import { FaHeart } from "react-icons/fa6";
import React from "react";
import { likePost } from "../../Functions/FireBaseFunctions.jsx";
import { getUserAuth } from "../../FireBase/AuthFunctions.jsx";
import { Link } from "react-router-dom";
import {useAuth} from "../../AuthContext/AuthContext.jsx";

function HeartPost({ postID, userID, likesData }) {

    const { isLoggedIn } = useAuth();
    const userInfo = getUserAuth();
    const likes = likesData;
    const hasLiked = likes.includes(userInfo?.displayName);

    async function handleLikePost() {
        try {
            await likePost(userID, postID);
        } catch (error) {
            console.error('Error handling like post:', error);
        }
    }

    return (
        <>
            {userInfo === null ? (
                <Link to={"/signin"}>
                    <button>
                        <FaHeart
                            className={`${hasLiked && isLoggedIn ? "text-red-500 animate-jump-in animate-once" : "text-gray-300"} text-1xl lg:text-xl`}
                        />
                    </button>
                </Link>
            ) : (

                <button onClick={handleLikePost}>
                    <FaHeart
                        size={20}
                        className={`${hasLiked && isLoggedIn ? "text-red-500 animate-jump-in animate-once" : "text-gray-300"} text-1xl lg:text-xl`}
                    />
                </button>
            )}
        </>
    );
}

export default HeartPost;
