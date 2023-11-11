
import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

export default function TrashConfirmAlert({message, onConfirm, onCancel, open }) {
    return (
            <React.Fragment>
                <Modal open={open} onClose={onCancel}>
                    <ModalDialog variant="outlined" role="alertdialog">
                        <DialogTitle>
                            <WarningRoundedIcon />
                            Confirmation
                        </DialogTitle>
                        <Divider />
                        <DialogContent>
                            {message}
                        </DialogContent>
                        <DialogActions>
                            <Button variant="solid" color="danger" onClick={onConfirm}>
                                Discard post
                            </Button>
                            <Button variant="plain" color="neutral" onClick={onCancel}>
                                Cancel
                            </Button>
                        </DialogActions>
                    </ModalDialog>
                </Modal>
            </React.Fragment>
    );
}
