
import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { FaSquarePlus } from 'react-icons/fa6';
import PostCard from './PostCard.jsx';

function PostPopUp() {

    const [open, setOpen] = React.useState(false);
    const [animateOut, setAnimateOut] = React.useState(false);

    const closeCard = () => {
        setAnimateOut(true);
        setTimeout(() => {
            setOpen(false);
            setAnimateOut(false);
        }, 500); // Adjust the duration to match your animation duration
    };

    return (
        <React.Fragment>
            <button onClick={() => setOpen(true)}>
                <FaSquarePlus className={'lg:text-2xl text-3xl text-blue-500 animate-jump-in'} />
            </button>

            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={closeCard}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '7px',
                }}
            >
                <div className={`lg:w-fit w-full animate-ease-linear ${animateOut ? 'animate-jump-out' : 'animate-jump-in'}`}>
                    <PostCard closeCard={closeCard} />
                </div>
            </Modal>
        </React.Fragment>
    );
}

export default PostPopUp;
