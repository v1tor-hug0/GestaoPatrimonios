import {api} from "@/src/pages/api/api";


export async function getPatrimonio(){
    try{
        const response = await api.get("Patrimonio");
        return response.data;
    }catch(err:any){
        throw new Error(err.message);
    }
}

export async function getPatrimonioPorId(id: string){
    try{
        const response = await api.get(`Patrimonio/${id}`);

        return response.data;
    }catch(err:any){
        throw new Error(err.message);
    }
}