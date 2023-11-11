
import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert, Slide } from "@mui/material";

function SnackBarAlert({severity, message, autoHideDuration }) {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
        }, autoHideDuration);

        return () => clearTimeout(timer);
    }, [autoHideDuration]);

    function TransitionLeft(props) {
        return <Slide {...props} direction="left" />;
    }

    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            TransitionComponent={TransitionLeft}
        >
            <Alert severity="info">{message}</Alert>
        </Snackbar>
    );
}

export default SnackBarAlert;
