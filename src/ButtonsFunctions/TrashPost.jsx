
import {FaTrash} from "react-icons/fa6";
import * as React from "react";
import {getUserAuth} from "../FireBase/AuthFunctions.jsx";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {useState} from "react";
import {Alert} from "@mui/material";


function TrashPost({userPosted, size}){

    const userInfo = getUserAuth();


    let trashStyle;

    if (userPosted === userInfo?.uid){
        trashStyle = `text-red-500 hover:text-red-800`
    } else {
        trashStyle = 'hidden'
    }

    return (
        <>
            <FaTrash size={size} className={`text-1xl lg:text-xl ${trashStyle}`} />
        </>
    )
}

export default TrashPost;