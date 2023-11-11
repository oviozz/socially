

import Avatar from '@mui/joy/Avatar';
import {FaBookmark, FaComment, FaHeart, FaQuoteLeft, FaTrash} from "react-icons/fa6";
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Face from '@mui/icons-material/Face';
import {convertTimestamp} from "../../Functions/Functions.jsx";
import TrashPost from "../../ButtonsFunctions/TrashPost.jsx";
import {deletePost} from "../../Functions/FireBaseFunctions.jsx";
import TrashConfirmAlert from "../../ButtonsFunctions/TrashConfirmAlert.jsx";
import {useState} from "react";
import HeartPost from "../../ButtonsFunctions/HeartPost/HeartPost.jsx";
import CommentPost from "../../ButtonsFunctions/CommentPost/CommentPost.jsx";
import LikePost from "../../ButtonsFunctions/LikesPost/LikePost.jsx";
import ImagePopup from "./ImagePopup.jsx";
import {useAuth} from "../../AuthContext/AuthContext.jsx";

function CardPic({widthSize, postData, wtype}){

    const { isLoggedIn } = useAuth();

    const { description, image, comments, likes, postID, timestamp, username, postLocation, postImage, userUid } = postData;

    const userID = `${username.replace(/\s/g, '')}${userUid}`;

    const [deleteConfirm, setDeleteConfirm] = useState(false)

    //deletePost(userID, postID)}
    return (
        <div className={"animate-fade-down w-full"} id={postID}>
            <Card
                variant="outlined"
                sx={{
                    '--Card-radius': (theme) => theme.vars.radius.xs,
                    [wtype]: widthSize,
                    backgroundColor: 'white',
                    borderRadius: '1rem',
                    '@media (max-width: 1000px)': {
                        minWidth: '100%',
                    },

                }}
            >
                <div className={"flex items-center justify-between"}>

                    <div className={"flex items-center gap-3"}>

                        <img alt="Remy Sharp" className={"rounded-full"} width={40} src={postImage || "defaultProfile.png"} size="md" />

                        <div className={"leading-4"}>
                            <h1 className={"font-semibold"}>{username}</h1>
                            <h2 className={"text-sm text-gray-400"}>{postLocation}</h2>
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

                <ImagePopup image={image} />

                <div className={"flex items-center gap-3"}>

                    <div className={"mt-1"}>
                        <HeartPost postID={postID} userID={userID} likesData={likes}/>
                    </div>

                    <CommentPost postID={postID} userID={userID} comments={comments}/>

                </div>

                <div className={"text-sm lg:text-1xl flex flex-col gap-1"}>

                    <LikePost likes={likes}/>

                    <div className={"mt-2"}>
                        <h2 className={"flex text-lg lg:text-xl"}>{description}</h2>
                        <h2 className={"text-gray-400 text-sm"}>{convertTimestamp(timestamp)}</h2>
                    </div>
                </div>
            </Card>

            <TrashConfirmAlert
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

export default CardPic;