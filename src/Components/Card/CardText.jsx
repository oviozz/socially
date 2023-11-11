
import Avatar from '@mui/joy/Avatar';
import { FaBookmark, FaComment, FaHeart, FaQuoteLeft, FaTrash } from "react-icons/fa6";
import {Card} from "@mui/joy";
import {convertTimestamp} from "../../Functions/Functions.jsx";
import TrashPost from "../../ButtonsFunctions/TrashPost.jsx";
import * as React from "react";
import {deletePost} from "../../Functions/FireBaseFunctions.jsx";
import SnackBarAlert from "../../ButtonsFunctions/SnackBarAlert.jsx";
import TrashConfirmAlert from "../../ButtonsFunctions/TrashConfirmAlert.jsx";
import {useState} from "react";
import HeartPost from "../../ButtonsFunctions/HeartPost/HeartPost.jsx";
import LikePost from "../../ButtonsFunctions/LikesPost/LikePost.jsx";
import CommentPost from "../../ButtonsFunctions/CommentPost/CommentPost.jsx";
import {useAuth} from "../../AuthContext/AuthContext.jsx";

function CardText({widthSize, postData, wtype}) {

    const { isLoggedIn } = useAuth();
    const { description, comments, likes, postID, timestamp, username, postLocation, postImage, userUid } = postData;
    const userID = `${username.replace(/\s/g, '')}${userUid}`;
    const [deleteConfirm, setDeleteConfirm] = useState(false)

    return (
        <div className={"animate-fade-down w-full"} id={postID}>

            <Card
                variant="outlined"
                sx={{
                    '--Card-radius': (theme) => theme.vars.radius.xs,
                    [wtype]: widthSize,
                    borderRadius: '1rem',
                    backgroundColor: 'white',
                    '@media (max-width: 1000px)': {
                        minWidth: '100%',
                    },
                }}
            >            <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">
                    <img alt="Remy Sharp" className={"rounded-full"} width={40} src={postImage || "defaultProfile.png"} size="md" />
                    <div className="leading-4">
                        <h1 className="text-gray-700 font-semibold ">{username}</h1>

                        <h2 className="text-gray-400 text-sm">{postLocation}</h2>
                    </div>
                </div>

                {
                    isLoggedIn && (
                        <button onClick={() => setDeleteConfirm(true)}>
                            <TrashPost userPosted={userUid}/>
                        </button>
                    )
                }

            </div>
                <div className="mb-3">
                    <p className="text-lg lg:text-xl">
                        {description}
                    </p>
                </div>
                <div className="flex items-center gap-3">

                    <div className={"mt-1"}>
                        <HeartPost postID={postID} userID={userID} likesData={likes}/>
                    </div>

                    <CommentPost postID={postID} userID={userID} comments={comments}/>

                </div>

                <div className="text-sm lg:text-1xl flex flex-col gap-1">

                    <LikePost likes={likes}/>

                    <p className="text-gray-400 text-sm">{convertTimestamp(timestamp)}</p>
                </div>
            </Card>

            <TrashConfirmAlert
                message={"Are you sure you want to discard your post?"}
                open={deleteConfirm}
                onConfirm={() => {
                    deletePost(userID, postID);
                    setDeleteConfirm(false);
                }}
                onCancel={() => setDeleteConfirm(false)}
            />
        </div>
    );
}

export default CardText;
