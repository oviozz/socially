
import './App.css'
import NavBar from "./Components/NavBar/NavBar.jsx";
import Home from "./Pages/HomePage/Home.jsx";
import {Route, Routes} from "react-router-dom";
import Profile from "./Pages/ProfilePage/Profile.jsx";
import ProtectLayout from "./Components/ProtectedLayout/ProtectLayout.jsx";
import Login from "./Components/AuthComp/Login.jsx";
import {AuthProvider} from "./AuthContext/AuthContext.jsx";

function App() {

    return (
        <div className={"container mx-auto"}>
            <AuthProvider>
                <NavBar>
                    <Routes>
                        <Route path={"/"} element={<Home />} ></Route>
                        <Route path={"/signin"} element={<Login />}></Route>

                        <Route element={<ProtectLayout />}>
                            <Route path={"/profile"} element={<Profile />} ></Route>
                        </Route>
                    </Routes>
                </NavBar>
            </AuthProvider>
        </div>
    )
}

export default App
