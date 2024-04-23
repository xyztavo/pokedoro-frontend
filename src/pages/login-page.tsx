import Login from "@/components/auth/login";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function LoginPage() {
    return (
        <div className="flex flex-col md:flex-row justify-center gap-4 p-4 font-pixel text-sm ">
            <Login />
            <div className="p-4 flex flex-row gap-4 items-center">
                <h1>Dont have an account yet?</h1>
                <Button variant={"secondary"} asChild>
                    <Link to={"/register"}>
                        Register Now
                    </Link>
                </Button>
            </div>
        </div>
    )
}