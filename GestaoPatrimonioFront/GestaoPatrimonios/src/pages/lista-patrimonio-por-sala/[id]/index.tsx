import styles from "./lista_patrimonios_por_sala.module.css";
import ListaPatrimonioPorSala from "../../../components/lista-patrimonio-por-sala/lista-patrimonio-por-sala";
import Header from "@/src/components/header/header";
import {useParams} from "next/navigation";
import {useEffect} from "react";

const ListaPatrimoniosPorSala = () => {

    const params = useParams()
    const id = params?.id;

    useEffect(() => {
        if(!id) return;
    }, [id])

    return (
        <>
            <Header>
            </Header>
            <main className={styles.page_content}>
                <ListaPatrimonioPorSala localizacaoID={String(id)} />
            </main>
        </>
    );
};

export default ListaPatrimoniosPorSala;