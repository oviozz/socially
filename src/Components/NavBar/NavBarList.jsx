import Avatar from "@mui/joy/Avatar";
import {FaSquarePlus} from "react-icons/fa6";
import {useState} from "react";
import PostPopUp from "../PostCard/PostPopUp.jsx";
import {Link} from 'react-router-dom';
import {AuthNavCheck} from "./AuthNavCheck.jsx";
import AccountMenu from "./AvatarMenu.jsx";
import * as React from "react";


function NavBarList() {

    const {authUser, handleLogout} = AuthNavCheck();


    return (
        <div className={"flex lg:justify-around justify-between items-center"}>

            <Link to={"/"}>
                <h1 className="text-4xl animate-jump-in titleFont bg-clip-text text-transparent bg-gradient-to-br from-blue-500 via-purple-500 to-blue-500 leading-relaxed">
                    Socially
                </h1>
            </Link>

            {
                authUser === null ? (

                    <Link to={"/signin"} className={"animate-jump-in w-fit"}>
                        <div className={"flex items-center gap-4"}>
                            <FaSquarePlus className={'lg:text-2xl text-3xl text-blue-500 animate-jump-in'}/>

                            <Avatar/>

                        </div>
                    </Link>
                ) : (
                    <>
                        <ul className={"flex items-center "}>

                            <PostPopUp/>

                            <div className={"animate-jump-in"}>
                                <AccountMenu logout={handleLogout}/>
                            </div>
                        </ul>
                    </>
                )
            }


        </div>
    );
}

export default NavBarList;
