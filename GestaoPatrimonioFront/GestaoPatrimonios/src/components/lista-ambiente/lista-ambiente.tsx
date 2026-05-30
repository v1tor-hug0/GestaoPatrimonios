import styles from "./lista-ambiente.module.css"
import CardAmbiente from "@/src/components/card-ambiente/card-ambiente";
import {faSliders} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import {erro} from "@/src/utils/toast";
import {getLocal} from "@/src/pages/api/localService";
import {sair} from "@/src/pages/api/authService";
import {router} from "next/client";

type Localizacao = {
    areaID: string;
    descricaoSAP: string;
    localSAP: number;
    localizacaoID: string;
    nomeLocal: string;
    responsavel: string;
    nomeArea: string;
}

const ListaAmbiente = () => {

    const [localizacoes, setLocalizacoes] = useState<Localizacao[]>([]);

    async function getLocalizacoes() {
        try {
            const dados = await getLocal();
            setLocalizacoes(dados);
        } catch (error) {
            sair();
            erro(error.message)
        }
    }

    useEffect(() => {
        getLocalizacoes();
    }, [])

    return (
        <>

            <section
                className={`${styles.page_header} layout_guide`}
                aria-labelledby="titulo_ambientes"
            >
                <h1 id="titulo_ambientes">
                    Ambientes
                </h1>

                <form
                    className={styles.search_area}
                    role="search"
                >
                    <label
                        htmlFor="pesquisa_ambiente"
                        className={styles.sr_only}
                    >
                        Pesquisar ambiente
                    </label>

                    <input
                        type="search"
                        id="pesquisa_ambiente"
                        name="pesquisaAmbiente"
                        placeholder="Pesquise o ambiente"
                    />

                    <button
                        type="button"
                        className={styles.filter_button}
                        aria-label="Filtrar ambientes"
                    >
                        <FontAwesomeIcon icon={faSliders}/>
                    </button>
                </form>
            </section>

            <section
                className={`${styles.table_section} layout_guide`}
                aria-label="Lista de ambientes"
            >
                <table className={styles.environment_table}>
                    <thead>
                    <tr>
                        <th>Local</th>
                        <th>Área</th>
                        <th>Responsável</th>
                    </tr>
                    </thead>
                    {localizacoes.map((item,) => (
                        <CardAmbiente key={item.localizacaoID}
                                      cardAmbiente={item}
                                      onclick={() => {
                                          router.push(`/lista-patrimonio-por-sala/${item.localizacaoID}`);
                                      }}></CardAmbiente>
                    ))}
                </table>
            </section>

            <nav
                className={styles.pagination}
                aria-label="Paginação"
            >
                <button
                    type="button"
                    className={styles.pagination_button}
                    aria-label="Página anterior"
                >
                    ‹
                </button>

                <a
                    href="#"
                    className={`${styles.pagination_link} ${styles.current}`}
                    aria-current="page"
                >
                    1
                </a>

                <a
                    href="#"
                    className={styles.pagination_link}
                >
                    2
                </a>

                <a
                    href="#"
                    className={styles.pagination_link}
                >
                    3
                </a>

                <button
                    type="button"
                    className={styles.pagination_button}
                    aria-label="Próxima página"
                >
                    ›
                </button>
            </nav>
        </>
    );
}

export default ListaAmbiente;