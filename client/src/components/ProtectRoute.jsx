import React from "react";
import { Navigate, Outlet } from "react-router-dom"

const ProtectRoute = () =>{
    const auth = localStorage.getItem("userId");

    return auth ? <Outlet /> : <Navigate to = "/"/>
}

export default ProtectRoute;