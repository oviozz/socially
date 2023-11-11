

import Card from "@mui/joy/Card";
import Avatar from "@mui/joy/Avatar";
import {AiOutlineClose, AiOutlineCloudUpload} from "react-icons/ai";
import {TiDelete} from "react-icons/ti";
import React from "react";
import CardPic from "../../Components/Card/CardPic.jsx";
import CardText from "../../Components/Card/CardText.jsx";
import ProfileFetchData from "./ProfileFetchData.jsx";
import HomeFetchData from "../HomePage/HomeFetchData.jsx";
import {getUserAuth} from "../../FireBase/AuthFunctions.jsx";


function Profile(){

    const userInfo = getUserAuth();


    const userID = `${userInfo.displayName.replace(/\s/g, '')}${userInfo.uid}`;

    return (
        <div className={"flex justify-center lg:mt-5 mt-10"}>

            <div className={"lg:w-fit w-full"}>

                <div className="flex flex-col items-center mb-5">
                    <img className={"rounded-full w-28 h-28"} alt="Remy Sharp" src={userInfo?.photoURL} size="lg" />
                    <div className="leading-5 text-center">
                        <h1 className="font-semibold text-2xl">{userInfo.displayName}</h1>
                        <h2 className="text-gray-500">Cerritos, LA</h2>
                    </div>
                </div>


                <div className={"flex justify-center"}>
                    <ProfileFetchData userID={userID}/>
                </div>
            </div>

        </div>
    )



}

export default Profile;