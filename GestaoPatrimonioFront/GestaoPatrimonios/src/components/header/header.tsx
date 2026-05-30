import styles from "./header.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faChevronDown, faUser} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {decodeToken} from "@/src/utils/jwt";
import {erro} from "@/src/utils/toast";
import {router} from "next/client";

type Usuario = {
    id: string;
    nome: string;
    email: string;
    NIF: string;
    cargo: string;
}

const Header = () => {

    const [usuario, setUsuario] = useState<Usuario>();

    async function getUserSettings() {
        try{
            const userInfos = await decodeToken();

            setUsuario(userInfos);
        }catch(error:any){
            erro(error.message)
        }
    }

    useEffect(
        () => {
            getUserSettings()
        }, [])

    return (
        <>
            <header className={styles.topbar}>
                <nav
                    className={`${styles.navbar} layout_guide`}
                    aria-label="Menu principal"
                >
                    <a
                        href="#"
                        className={styles.logo_link}
                        aria-label="Página inicial"
                    >
                        <img
                            src="/imgs/Logo Senai.png"
                            alt="Logo SENAI"
                            className={styles.logo}
                            onClick={ () => {
                                router.push("/lista-ambientes")
                            }
                            }
                        />
                    </a>

                    <ul className={styles.menu_list}>
                        <li>
                            <a
                                href="#"
                                className={styles.menu_link}
                            >
                                Ambientes

                                <FontAwesomeIcon icon={faChevronDown}/>
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className={styles.menu_link}
                            >
                                Patrimônios
                            </a>
                        </li>
                    </ul>

                    <section
                        className={styles.user_area}
                        aria-label="Informações do usuário"
                    >
                        <button
                            className={styles.user_icon}
                            aria-label="Abrir perfil do usuário"
                        >
                            <FontAwesomeIcon icon={faUser}/>
                        </button>

                        <div className={styles.user_info}>
                            <strong>{usuario?.nome}</strong>
                            <span>{usuario?.email}</span>
                        </div>

                        <button
                            className={styles.arrow_button}
                            aria-label="Abrir opções da conta"
                        >
                            <FontAwesomeIcon icon={faChevronDown}/>
                        </button>
                    </section>

                    <button
                        className={styles.hamburguer}
                        aria-label="Abrir opções de menu"
                    >
                        <FontAwesomeIcon icon={faBars}/>
                    </button>
                </nav>
            </header>
        </>
    )
}

export default Header