import styles from "./detalhe-patrimonio.module.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Header from "@/src/components/header/header";
import ListaHistorico from "@/src/components/lista-historico/lista-historico";
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {getPatrimonio, getPatrimonioPorId} from "@/src/pages/api/patrimonioService";
import {erro} from "@/src/utils/toast";
import {getLogPatrimonioId} from "@/src/pages/api/logPatrimonioService";
import {router} from "next/client";

type Patrimonio = {
    denominacao: string;
    imagem: string;
    localizacaoID: string;
    numeroPatrimonio: string;
    patrimonioID: string;
    statusPatrimonioID: string;
    valor: number;
}

type LogPatrimonio = {
    logPatrimonioID: string
    dataTransferencia: string
    patrimonioID: string
    denominacaoPatrimonio: string
    tipoAlteracao: string
    statusPatrimonio: string,
    usuario: string,
    localizacao: string
}

const DetalhePatrimonio = () => {

    const [patrimonio, setPatrimonio] = useState<Patrimonio>()
    const [logPatrimonio, setLogPatrimonio] = useState<LogPatrimonio[]>()
    const [ultimoLogPatrimonio, setultimoLogPatrimonio] = useState<LogPatrimonio>()

    const params = useParams();
    const id = params?.id;

    async function getPatrimonioId() {
        try {
            const dados = await getPatrimonioPorId(String(id))

            setPatrimonio(dados)
        } catch (err: any) {
            erro(err.message)
        }
    }

    async function getLogPatrimonioPorId() {
        try {
            const dados = await getLogPatrimonioId(String(id))

            setLogPatrimonio(dados)

            setultimoLogPatrimonio(dados[dados.length - 1])
        } catch (err: any) {
            erro(err.message)
        }
    }

    useEffect(() => {
        if (!id) return;

        getPatrimonioId();
        getLogPatrimonioPorId()
    }, [id]);

    return (
        <>
            <Header>

            </Header>
            {!id ? <p>Carregando...</p> :
                <main className={styles.page_content}>
                    <section
                        className={`${styles.page_detalhes} ${styles.layout_guide}`}
                        aria-labelledby="titulo_patrimonio"
                    >
                        <div
                            className={styles.back_link}
                            onClick={() => {
                                router.back()
                            }}
                        >
                            <FontAwesomeIcon icon={faArrowLeft}/>
                            Voltar
                        </div>

                        <h1 id="titulo_patrimonio">
                            Patrimônio: {patrimonio?.numeroPatrimonio}
                        </h1>

                        <article className={styles.patrimonio_card}>
                            <div className={styles.patrimonio_content}>
                                <dl>
                                    <dt>Denominação</dt>
                                    <dd>
                                        {patrimonio?.denominacao}
                                    </dd>
                                </dl>

                                <dl>
                                    <dt>Data transferência</dt>
                                    <dd>
                                        <time dateTime="2026-02-09">
                                            {ultimoLogPatrimonio?.dataTransferencia}
                                        </time>
                                    </dd>
                                </dl>

                                <dl>
                                    <dt>Local Atual</dt>
                                    <dd>{ultimoLogPatrimonio?.localizacao}</dd>
                                </dl>

                                <dl>
                                    <dt>Status Atual</dt>
                                    <dd>{ultimoLogPatrimonio?.statusPatrimonio}</dd>
                                </dl>
                            </div>
                        </article>
                    </section>

                    <section
                        className={`${styles.table_section} ${styles.layout_guide}`}
                        aria-label="Lista de histórico do patrimônio"
                    >
                        <h2>Histórico</h2>
                        <ListaHistorico logPatrimonio={logPatrimonio!}/>
                    </section>
                </main>

            }
        </>
    );
};

export default DetalhePatrimonio;