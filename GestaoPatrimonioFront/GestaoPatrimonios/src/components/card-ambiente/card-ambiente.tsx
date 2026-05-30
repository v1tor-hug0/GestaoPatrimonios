 import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import styles from "./card-ambiente.module.css";
import {router} from "next/client";

type CardAmbiente = {
    nomeLocal: string;
    responsavel: string;
    nomeArea: string;
}

type CardProps = {
    cardAmbiente: CardAmbiente;
    onclick: () => void;
}

const CardAmbiente = ({cardAmbiente, onclick}: CardProps) => {
    return (
        <>
            <tbody onClick={event => onclick()} className={styles.environment_table}>
            <tr>
                <td>{cardAmbiente.nomeLocal}</td>
                <td>{cardAmbiente.nomeArea}</td>
                <td>{cardAmbiente.responsavel}</td>
            </tr>
            </tbody>

        </>
    );
}

export default CardAmbiente;