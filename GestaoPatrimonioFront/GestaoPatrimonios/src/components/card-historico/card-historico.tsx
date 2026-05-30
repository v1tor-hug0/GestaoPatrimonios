import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./card-historico.module.css";

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

const CardHistorico = ({localizacao, usuario,logPatrimonioID,patrimonioID,statusPatrimonio,denominacaoPatrimonio,tipoAlteracao,dataTransferencia}:LogPatrimonio) => {
    return (
        <>
                <tbody className={styles.history_table}>
                <tr>
                    <td data-label="Data">
                        {dataTransferencia}
                    </td>

                    <td data-label="Tipo de movimentação">
                                    <span className={styles.status_badge}>
                                        {tipoAlteracao}
                                    </span>
                    </td>

                    <td data-label="Origem">
                        Sem origem
                    </td>

                    <td data-label="Destino">
                        {localizacao}
                    </td>

                    <td data-label="Responsável">
                        {usuario}
                    </td>

                    <td data-label="Justificativa">
                        <a
                            href="#"
                            aria-label="Ver justificativa da transferência"
                        >
                            <FontAwesomeIcon icon={faCircleInfo}/>
                        </a>
                    </td>
                </tr>
                </tbody>
        </>
    );
}

export default CardHistorico;