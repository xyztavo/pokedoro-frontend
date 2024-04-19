import { Link } from "react-router-dom";
import { ModeToggle } from "./ui/mode-toggle";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react";
import LoginButton from "./auth/login-button";
import { Button } from "./ui/button";

export function Navbar() {
    return (
        <div>
            <div className="flex flex-row gap-4 p-4 justify-between items-center border-b sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 font-pixel">
                <Link to={'/'} className="flex flex-row justify-center items-center gap-4">
                    <img src="logo.svg" width={35} />
                    <h1 className="text-2xl">Pokédoro</h1>
                </Link>
                <div className="hidden md:flex flex-row items-center gap-4">
                    <ModeToggle />
                    <LoginButton />
                </div>
                <div className="flex md:hidden">
                    <Sheet >
                        <SheetTrigger asChild><Button size={'icon'} variant={'outline'} ><Menu /></Button></SheetTrigger>
                        <SheetContent className="font-pixel flex flex-col gap-4 p-4 items-center">
                            <SheetClose asChild>
                                <Link to={'/'} className="flex flex-row justify-center items-center gap-4 mt-4">
                                    <img src="logo.svg" width={35} />
                                    <h1 className="text-2xl">Pokédoro</h1>
                                </Link>
                            </SheetClose>
                            <div className="flex flex-row gap-4">
                                <LoginButton />
                                <ModeToggle />
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    )
}