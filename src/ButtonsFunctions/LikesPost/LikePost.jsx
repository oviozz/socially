
import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Switch from '@mui/joy/Switch';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalOverflow from '@mui/joy/ModalOverflow';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import {FaBan} from "react-icons/fa6";

function LikePost({likes}){

    const [layout, setLayout] = React.useState(undefined);
    const [scroll, setScroll] = React.useState(true);
    return (
        <React.Fragment>
            <Stack direction="row" spacing={1}>
                <div
                    onClick={() => {
                        setLayout('center');
                    }}
                >
                    <h3>
                        Liked by{' '}
                        <span className="font-semibold hover:text-blue-500 hover:cursor-pointer">
                            {likes.length > 0 ? (
                                <>
                                    {likes.slice(-1)[0]}
                                    {likes.length > 1 ? ` and ${likes.length - 1} others` : ''}
                                </>
                            ) : (
                                'none.'
                            )}
                        </span>
                    </h3>
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
                            Liked by
                        </Typography>
                        {scroll && (
                            <List>  
                                {
                                    likes.length ?
                                        <>
                                            {likes.map((people, index) => (
                                                <ListItem className="border-t" key={index}>❤️ {people}</ListItem>
                                            ))}
                                        </>
                                        :
                                        <h1 className={"flex justify-center items-center gap-2 text-gray-500"}><FaBan size={20}/>No one has liked yet.</h1>
                                }
                            </List>
                        )}
                    </ModalDialog>
                </ModalOverflow>
            </Modal>
        </React.Fragment>
    );

}


export default LikePost;