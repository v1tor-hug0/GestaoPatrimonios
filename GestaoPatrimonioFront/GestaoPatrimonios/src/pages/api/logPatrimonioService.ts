import {api} from "@/src/pages/api/api";


export async function getLogPatrimonioId(id: string){
    try{
        const response = await api.get(`LogPatrimonio/patrimonio/${id}`);

        return response.data;
    } catch(error:any){
        throw new Error(error.message);
    }
}