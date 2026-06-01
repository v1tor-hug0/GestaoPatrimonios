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

export async function importarPatrimonioCsv(arquivo: File){
    try {
        const formData = new FormData();
        // como se fosse um JSON
        // "nome" : "banana"
        formData.append("arquivoCsv", arquivo);
        await api.post("Patrimonio/importar-csv", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }
    catch(err:any){
        throw new Error(err.response?.data || "Erro ao importar CSV.");
    }
}