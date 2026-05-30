import {api} from "@/src/pages/api/api";
import secureLocalStorage from "react-secure-storage";
import {jwtDecode} from "jwt-decode";
import {router} from "next/client";

export async function auth(nif: string, senha: string) {
    try {
        const response = await api.post("/Autenticacao/login", {
            nif,
            senha
        });

        const token = response.data.token;

        secureLocalStorage.setItem("token", token);
    } catch (e: any) {
        throw new Error(e.message);
    }
}

export async function sair() {
    secureLocalStorage.clear();
    router.push("/login");
}