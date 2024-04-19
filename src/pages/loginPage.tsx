import { Button } from "@/components/ui/button";
import { useState } from "react";
import Register from "@/components/auth/register";
import Login from "@/components/auth/login";




export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true)
    return (
        isLogin ?
            <div className="flex flex-col md:flex-row justify-center gap-4 p-4 font-pixel text-sm ">
                <Login />
                <div className="p-4 flex flex-row gap-4 items-center">
                    <h1>Dont have an account yet?</h1>
                    <Button variant={"secondary"} onClick={() => setIsLogin((login) => !login)}>
                        Register Now
                    </Button>
                </div>
            </div>
            :
            <div className="flex flex-col  md:flex-row justify-center gap-4 p-4 font-pixel text-sm">
                <Register />
                <div className="p-4 flex flex-row gap-4 items-center">
                    <h1>Already have a account?</h1>
                    <Button variant={"secondary"} onClick={() => setIsLogin((login) => !login)}>
                        Log in
                    </Button>
                </div>
            </div>
    )
}