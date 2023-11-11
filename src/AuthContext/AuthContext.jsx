import React, {createContext, useState, useContext, useEffect} from 'react';
import {getUserAuth} from "../FireBase/AuthFunctions.jsx";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isLoggedIn, setLoggedIn] = useState(false);

    const userInfo = getUserAuth();

    useEffect(() => {
        if (userInfo?.uid){
            setLoggedIn(true)
        }
    }, [])

    const login = () => setLoggedIn(true);
    const logout = () => setLoggedIn(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
