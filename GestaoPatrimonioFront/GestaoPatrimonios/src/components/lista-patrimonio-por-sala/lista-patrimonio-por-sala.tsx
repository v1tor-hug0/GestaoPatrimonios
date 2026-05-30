import styles from "./lista-patrimonio-por-sala.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight, faSliders} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {getPatrimonio} from "@/src/pages/api/patrimonioService";
import {erro, notificacao} from "@/src/utils/toast";
import CardPatrimonioPorSala from "@/src/components/card-patrimonio-por-sala/card-patrimonio-por-sala";
import {router} from "next/client";
import ReactPaginate from "react-paginate";
import {getLocal, getLocalID} from "@/src/pages/api/localService";


type Patrimonio = {
    patrimonioID: string,
    denominacao: string,
    numeroPatrimonio: string,
    valor: number,
    imagem: string,
    localizacaoID: string,
    statusPatrimonioID: string,
    dataTransferencia: string,
}

type listaPatrimonio = {
    localizacaoID: string,
}

type Localizacao = {
    nomeLocal: string
}

const ListaPatrimonioPorSala = ({localizacaoID}: listaPatrimonio) => {

    const [listaPatrimonioPorSala, setListaPatrimonioPorSala] = useState<Patrimonio[]>()
    const [listaLocalizacao, setListaLocalizacao] = useState<Localizacao>()

    const [primeiroItem, setPrimeiroItem] = useState<number>(0)

    const itemsPorPagina = 50;

    const ultimoItem = primeiroItem + itemsPorPagina;
    const itensAtuais = listaPatrimonioPorSala?.slice(primeiroItem, ultimoItem);
    const contPaginas = listaPatrimonioPorSala ? Math.ceil(listaPatrimonioPorSala!.length / itemsPorPagina) : 10;

    const alterarPagina = (event: any) => {
        const newOffset = (event.selected * itemsPorPagina) % listaPatrimonioPorSala!.length;

        setPrimeiroItem(newOffset);
    };

    async function listagemPatrimonios() {
        try {
            const dados: Patrimonio[] = await getPatrimonio()

            const listaFiltrada = dados.filter(value => value.localizacaoID == localizacaoID)
            setListaPatrimonioPorSala(listaFiltrada)
            if(listaFiltrada.length === 0){
                erro("Este ambiente não possui patrimônios cadastrados")
            }
        } catch (error: any) {
            erro(error.message)
        }
    }

    async function listagemLocal() {
        try {
            const local: Localizacao = await getLocalID(localizacaoID)
            setListaLocalizacao(local)
        }
        catch (error: any) {
            erro(error.message)
        }
    }

    useEffect(() => {
        if (!localizacaoID) return;

        listagemPatrimonios();
        listagemLocal()
    }, [localizacaoID]);


    return (
        <>

            <section
                className={`${styles.page_header} ${styles.layout_guide}`}
                aria-labelledby="titulo_patrimonios"
            >
                <h1 id="titulo_patrimonios">
                    Patrimonios de {listaLocalizacao?.nomeLocal}
                </h1>

                <form
                    className={styles.search_area}
                    role="search"
                >
                    <label
                        htmlFor="pesquisa_ambiente"
                        className={styles.sr_only}
                    >
                        Pesquisar patrimônios
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
                        aria-label="Filtrar patrimônios"
                    >
                        <FontAwesomeIcon icon={faSliders}/>
                    </button>
                </form>
            </section>

            <section
                className={`${styles.table_section} ${styles.layout_guide}`}
                aria-label="Lista de patrimônios"
            >
                <table className={styles.environment_table}>
                    <thead>
                    <tr>
                        <th>Patrimônio</th>
                        <th>Denominação</th>
                        <th>Data transferência</th>
                        <th>Detalhes</th>
                        <th>Transferir</th>
                    </tr>
                    </thead>
                    {itensAtuais ? itensAtuais?.map(value => (
                        <CardPatrimonioPorSala key={value.patrimonioID}
                                               onclick={() => {
                                                   router.push(`/detalhe-produto/${value.patrimonioID}`)
                                               }}
                                               patrimonio={value}
                        ></CardPatrimonioPorSala>
                    )) : <tbody>
                    <tr>
                        <td>Carregando lista...</td>
                    </tr>
                    </tbody>}
                </table>
            </section>


            <nav className={`${styles.pagination}`}>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel={<FontAwesomeIcon icon={faChevronRight}/>}
                    previousLabel={<FontAwesomeIcon icon={faChevronLeft}/>}
                    onPageChange={alterarPagina}
                    pageRangeDisplayed={1}
                    pageCount={contPaginas}
                    renderOnZeroPageCount={null}

                    containerClassName={styles.pagination}
                    pageClassName={styles.pagination_link}
                    pageLinkClassName={styles.pagination_link}

                    previousClassName={styles.pagination_button}
                    nextClassName={styles.pagination_button}

                    activeClassName={styles.current}
                />

            </nav>

        </>
    )
}

export default ListaPatrimonioPorSala