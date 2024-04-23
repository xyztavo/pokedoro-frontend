import Register from "@/components/auth/register";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function RegisterPage() {
    return (
        <div className="flex flex-col  md:flex-row justify-center gap-4 p-4 font-pixel text-sm">
            <Register />
            <div className="p-4 flex flex-row gap-4 items-center">
                <h1>Already have a account?</h1>
                <Button variant={"secondary"} asChild>
                    <Link to={'/login'}>
                        Log in
                    </Link>
                </Button>
            </div>
        </div>
    )
}