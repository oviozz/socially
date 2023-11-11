
import React, {useEffect, useState} from 'react';
import Avatar from '@mui/joy/Avatar';
import Card from '@mui/joy/Card';
import {AiOutlineClose, AiOutlineCloudUpload} from "react-icons/ai";
import {TiDelete} from "react-icons/ti";
import {addPostforUser} from "../../Functions/FireBaseFunctions.jsx";
import {getUserAuth} from "../../FireBase/AuthFunctions.jsx";
import {getCityAndRegion} from "../../Functions/Functions.jsx";
import Button from "@mui/joy/Button";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {Link, useNavigate} from "react-router-dom";

function PostCard({closeCard}) {

    const navigate = useNavigate();
    const userInfo = getUserAuth();
    const [image, setImage] = useState(null);
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false);
    const [isButtonDisabled, setButtonDisabled] = useState(true);



    const [postInfo, setPostInfo] = useState({
        description: "",
        imageInfo: null,
        profilePic: userInfo?.photoURL
    })

    const handlePostSubmit = async (e) => {
        e.preventDefault();

        setLoading(true)

        const userProfile = `${userInfo.displayName.replace(/\s/g, '')}${userInfo.uid}`;

        await addPostforUser(userProfile, userInfo.displayName,  postInfo.description, postInfo.imageInfo, postInfo.profilePic)

        navigate('/')
        closeCard();

        setLoading(false);
    }

    const handleImageChange = (e) => {

        const file = e.target.files[0];
        if (file?.size <= 10 * 1024 * 1024) {
            setError(false)

            setImage(URL.createObjectURL(file));
            setPostInfo({ ...postInfo, imageInfo: file });
        }else {
            setError(true);
        }

    };


    const deleteImage = () => {
        setImage(null);
        setPostInfo({ ...postInfo, imageInfo: null });
    };


    useEffect(() => {
        if (postInfo.description || postInfo.imageInfo) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [postInfo.description, postInfo.imageInfo]);

    return (
        <Card
            variant="outlined"
            sx={{
                '--Card-radius': (theme) => theme.vars.radius.xs,
                backgroundColor: 'white',
                minWidth: 1000,
                borderRadius: '1rem',
                '@media (max-width: 1000px)': {
                    minWidth: '100%',
                },
            }}
        >
            <div className={'flex items-center justify-between'}>
                <div className={'flex items-center gap-3'}>
                    <Avatar alt="Remy Sharp" src={userInfo?.photoURL} size={'md'} />
                    <div className={'leading-5'}>
                        <h1 className={'font-semibold'}>{userInfo.displayName}</h1>
                        <h2 className={'text-sm'}>{userInfo.location}</h2>
                    </div>
                </div>

                <button onClick={closeCard}>
                    <AiOutlineClose className={"text-gray-300 hover:text-gray-700 text-1xl lg:text-xl"} />
                </button>
            </div>

            <form className={"flex flex-col gap-3"} onSubmit={handlePostSubmit}>

                <textarea
                    className="description rounded-lg sec p-3 h-60 border border-gray-300 outline-none"
                    spellCheck="false"
                    placeholder="What do you wanna post about?"
                    required
                    name={"description"}
                    onChange={(e) => {setPostInfo({...postInfo, description: e.target.value})}}
                ></textarea>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    id="image-upload"
                />

                {
                    image ?
                        <>
                            <div onClick={deleteImage} className="cursor-pointer flex items-center w-fit title rounded-lg border border-gray-300 p-2 gap-1 outline-none">
                                <TiDelete size={25}  className={"text-gray-500"} />Remove Image
                            </div>
                        </>
                        :
                        <>
                            <label htmlFor="image-upload" className="cursor-pointer flex items-center w-fit title rounded-lg border border-gray-300 p-2 gap-1 outline-none">
                                <AiOutlineCloudUpload size={25}  className={"text-gray-500"} onClick={handleImageChange}/>Upload Image
                            </label>
                        </>
                }

                {
                    error && (
                        <h1 className={"text-red-500"}>Image size must be 10 MB or less.</h1>
                    )
                }

                {image && (
                    <img
                        src={image}
                        alt="Image Preview"
                        className={"max-w-2xl rounded-lg"}
                        width={"20%"}
                        style={{ objectFit: 'cover' }}
                    />
                )}

                <Button loading={loading} disabled={isButtonDisabled} startDecorator={<SendRoundedIcon fontSize={"small"}/>} onClick={handlePostSubmit} >Post</Button>

            </form>

        </Card>
    );
}

export default PostCard;
