

import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth, provider} from "../../FireBase/Config.jsx";
import { signInWithPopup } from "firebase/auth"
import {getToken, SetToken} from "../../FireBase/AuthFunctions.jsx";
import {getCityAndRegion} from "../../Functions/Functions.jsx";
import {useAuth} from "../../AuthContext/AuthContext.jsx";

function Login(){

    const navigate = useNavigate();
    const { login } = useAuth();


    useEffect(() => {
        if (getToken()){
            navigate("/")
        }
    }, [])


    const [error, setError] = useState("")

    const signInWithGoogle = async () => {

        try {

            const userCredential = await signInWithPopup(auth, provider)
            const user = userCredential.user

            const userData = {
                ...user,
                location: await getCityAndRegion()
            };

            SetToken(userData, user.accessToken)
            login();

            navigate('/')

        } catch (error) {
            setError(error.message)
        }


    }

    return (
        <div className={"flex justify-center items-center rounded-2xl h-[calc(100vh-94px)]"}>
            <div className={"bg-white w-full max-w-md space-y-7 border p-5"}>

                <div>
                    <h1 className={"font-bold text-3xl"}>Sign in</h1>
                    <h2 className={"text-2xl"}>to get started</h2>
                </div>

                <button onClick={signInWithGoogle} className="rounded-2xl flex items-center justify-center w-full text-blue-500 border py-2 px-4 rounded">
                    <img src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png"
                         alt="Google Icon" className="w-6 h-6 mr-2"/>
                    Sign in with Google
                </button>
            </div>
        </div>
    )
}

export default Login;