

import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import ModalOverflow from "@mui/joy/ModalOverflow";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import {FaBan, FaComment} from "react-icons/fa6";
import {convertTimestamp} from "../../Functions/Functions.jsx";
import {useState} from "react";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {deleteComment, deletePost, likePost, writeComment} from "../../Functions/FireBaseFunctions.jsx";
import * as React from "react";
import TrashPost from "../TrashPost.jsx";
import TrashConfirmAlert from "../TrashConfirmAlert.jsx";
import {useAuth} from "../../AuthContext/AuthContext.jsx";
function CommentPost({postID, userID, comments}){

    const { isLoggedIn } = useAuth();
    const [layout, setLayout] = useState(undefined);
    const [scroll, setScroll] = useState(true);
    const [postReply, setPostReply] = useState('')

    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [deleteIndex, setDeleteIndex] = useState('')

    function handleInput(e){
        setPostReply(e.target.value)
    }
    async function sendReply(e) {
        e.preventDefault();

        try {
            await writeComment(userID, postID, postReply);
            setPostReply('')

        } catch (error) {
            console.error('Error handling like post:', error);
        }
    }

    function deleteReply(index){
        setDeleteIndex(index)
        setDeleteConfirm(true)
    }



    return (
        <div>
            <Stack direction="row" spacing={1}>
                <div
                    onClick={() => {
                        setLayout('center');
                    }}
                >
                    <div className={"animate-jump-in"}>
                        <FaComment size={22} className={"text-gray-300 hover:text-lime-400 text-1xl lg:text-xl"}/>
                    </div>
                </div>
            </Stack>
            <Modal
                open={!!layout}
                onClose={() => {
                    setLayout(undefined);
                }}
            >
                <ModalOverflow>
                    <ModalDialog aria-labelledby="modal-dialog-overflow" layout={layout}>
                        <ModalClose />
                        <Typography id="modal-dialog-overflow" level="h2">
                            Comments:
                        </Typography>
                        {
                            isLoggedIn && (
                                <>
                                    <FormLabel>Reply to post:</FormLabel>

                                    <form className={"flex gap-3"} onSubmit={sendReply}>
                                        <Input required variant={'outlined'} onChange={handleInput} value={postReply}/>

                                        <button className={"bg-indigo-600 text-white p-1.5 rounded"} type={'submit'}>
                                            <SendRoundedIcon />
                                        </button>
                                    </form>
                                </>
                            )
                        }

                        {scroll && (
                            <ul className="">
                                {
                                    comments.length ?
                                        <>
                                            {comments.map((comment, index) => (
                                                <li key={index} className="flex items-start gap-4 py-2 ">
                                                    <img src={comment.profile} alt="User Avatar" className="rounded-full w-10 h-10" />
                                                    <div className="flex flex-col w-full">
                                                        <div className="mb-2">

                                                            <div className={"flex items-center justify-between w-full"}>
                                                                <h1 className="font-semibold">{comment.username}</h1>

                                                                <button onClick={() => deleteReply(index)}>
                                                                    <TrashPost size={15} userPosted={comment.uid} />
                                                                </button>
                                                            </div>

                                                            <h1 className="text-gray-500 text-xs">{convertTimestamp(comment.timestamp)}</h1>
                                                        </div>
                                                        <h1>{comment.text}</h1>
                                                    </div>
                                                </li>
                                            ))}
                                        </>
                                        :
                                        <h1 className={"flex justify-center items-center gap-2 text-gray-500"}><FaBan size={20}/>No one has comment yet.</h1>
                                }
                            </ul>
                        )}
                    </ModalDialog>
                </ModalOverflow>
            </Modal>

            <TrashConfirmAlert
                message={"Are you sure you want to discard your reply?"}
                open={deleteConfirm}
                onConfirm={() => {
                    deleteComment(userID, postID, deleteIndex)
                    setDeleteConfirm(false);
                }}
                onCancel={() => setDeleteConfirm(false)}
            />
        </div>
    );

}


export default CommentPost;