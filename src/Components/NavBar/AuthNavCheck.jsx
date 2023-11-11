
import { useState, useEffect } from "react";
import {auth} from "../../FireBase/Config.jsx";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {DeleteToken, getToken} from "../../FireBase/AuthFunctions.jsx";
import {useAuth} from "../../AuthContext/AuthContext.jsx";

export function AuthNavCheck() {

    const [authUser, setAuthUser] = useState(getToken());
    const { logout } = useAuth();


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        console.log('Logged out');
        DeleteToken();
        logout();
        await signOut(auth)
    };

    return { authUser, handleLogout };
}
