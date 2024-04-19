import { checkUser } from "@/lib/auth/userAuth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function ProtectedRoute() {
    const navigate = useNavigate()
    const isLoggedIn = checkUser()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
            return
        }
    })
    return <Outlet />
}