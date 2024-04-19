import { jwtDecode } from "jwt-decode";

export const checkUser = (): boolean => localStorage.getItem("auth") ? true : false;

type TUserData = {
    id: string,
    name: string,
}

export function getUser(): TUserData {
    const token = localStorage.getItem("auth")
    if (token) {
        const userData: TUserData = jwtDecode(token)
        return userData
    }
    return {
        id: ``,
        name: ``
    }
}   