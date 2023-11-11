
import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import AspectRatio from "@mui/joy/AspectRatio";
import CardOverflow from "@mui/joy/CardOverflow";

export default function ImagePopup({image}) {
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>

            <CardOverflow onClick={() => setOpen(true)}>
                <AspectRatio>
                    <img className={"cursor-pointer"} src={image} alt="" loading="lazy"/>
                </AspectRatio>
            </CardOverflow>

            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1em'}}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        maxWidth: 1000,
                        borderRadius: 'md',
                        p: 0.7,
                        boxShadow: 'lg',
                    }}
                >
                    <ModalClose variant="" sx={{ m: -1 }} />
                    <img src={image} className={"rounded"} alt="" loading="lazy"/>
                </Sheet>
            </Modal>
        </React.Fragment>
    );
}
