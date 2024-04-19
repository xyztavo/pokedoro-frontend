import { Link, useNavigate } from "react-router-dom";
import { Button, buttonVariants } from "../ui/button";
import { checkUser, getUser } from "@/lib/auth/userAuth";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function LoginButton() {
    const navigate = useNavigate()
    const isLoggedIn = checkUser()

    const resultsFromJwt = getUser()
    if (!resultsFromJwt) return
    const userData = resultsFromJwt


    return (
        isLoggedIn ? <DropdownMenu>
            <Button variant={"secondary"} asChild>
                <DropdownMenuTrigger>{userData.name}</DropdownMenuTrigger>
            </Button>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => navigate('/user')}>My Account</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                    navigate('/login')
                    localStorage.removeItem("auth")
                    return location.reload()

                }}>Log Out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu> :
            <Link className={buttonVariants({ variant: "default" })} to={'/login'}>Log In</Link>
    )
}