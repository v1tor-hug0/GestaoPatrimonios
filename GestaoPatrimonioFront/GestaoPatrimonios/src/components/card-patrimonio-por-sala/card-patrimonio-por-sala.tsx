import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightArrowLeft, faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import styles from "./card-patrimonio-por-sala.module.css"

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

type CardProps = {
    onclick: () => void;
    patrimonio: Patrimonio;
}

const CardPatrimonioPorSala = ({patrimonio, onclick}:CardProps) => {
    return (
        <>
            <tbody onClick={event => onclick()}>
            <tr>
                <td>{patrimonio.numeroPatrimonio}</td>
                <td>{patrimonio.denominacao}</td>
                <td>{patrimonio.dataTransferencia}</td>

                <td>
                    <a
                        href="#"
                        aria-label="Ver detalhes do patrimônio"
                    >
                        <FontAwesomeIcon icon={faCircleInfo}/>
                    </a>
                </td>

                <td>
                    <a
                        href="#"
                        aria-label="Transferir patrimônio"
                    >
                        <FontAwesomeIcon
                            icon={faArrowRightArrowLeft}
                        />
                    </a>
                </td>
            </tr>
            </tbody>

        </>
    )
}

export default CardPatrimonioPorSala