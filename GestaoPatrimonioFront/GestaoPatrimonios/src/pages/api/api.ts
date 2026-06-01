import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const apiLocal = "https://localhost:7063/api/"

const apiViaCep = "https://viacep.com.br/ws/"

export const api = axios.create({
    baseURL: apiLocal,
})

export const apiCep = axios.create({
    baseURL: apiViaCep,
})

api.interceptors.request.use((config)=> {
    const token = secureLocalStorage.getItem("token")

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})