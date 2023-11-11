
import React, { useState } from "react";
import HomeFetchData from "./HomeFetchData.jsx";
import {useAuth} from "../../AuthContext/AuthContext.jsx";

function Home() {


    return (
        <div className={"flex justify-center mt-7"}>
            <div className={"flex flex-col items-center gap-5 w-full lg:w-fit"}>
                <HomeFetchData />
            </div>
        </div>
    );
}

export default Home;
