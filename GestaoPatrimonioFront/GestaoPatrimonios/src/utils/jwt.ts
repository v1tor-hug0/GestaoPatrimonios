import {jwtDecode} from "jwt-decode";
import secureLocalStorage from "react-secure-storage";

type Token = {
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string
    "NIF": string
}

export async function decodeToken() {
    const token= secureLocalStorage.getItem("token");

    const decoded = jwtDecode<Token>(token)

    const user: Token = {
        id: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
        nome: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
        cargo: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        NIF: decoded["NIF"]
    }

    if (user) {
        return user;
    } else {
        return null;
    }
}