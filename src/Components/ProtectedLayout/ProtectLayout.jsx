
import {getToken} from "../../FireBase/AuthFunctions.jsx";
import {Navigate, Outlet} from "react-router-dom";


function ProtectLayout(){

    const token = getToken();

    return (
        token ?
            <Outlet />
            :
            <Navigate to={"/login"} />
    )

}

export default ProtectLayout;