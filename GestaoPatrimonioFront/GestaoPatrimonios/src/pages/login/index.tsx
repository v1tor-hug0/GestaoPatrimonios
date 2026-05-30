import styles from "./login.module.css";
import {FormEvent, useState} from "react";
import {auth} from "@/src/pages/api/authService";
import {erro, notificacao} from "@/src/utils/toast";
import {router} from "next/client";
import {decodeToken} from "@/src/utils/jwt";

export default function Login() {

    const [nif, setNif] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    async function login (e: React.FormEvent<HTMLFormElement>)  {
        e.preventDefault();

        try{
            await auth(nif, senha);

            notificacao("Autenticado com sucesso!");
            await decodeToken();
            setTimeout(()=>{
                router.push("/lista-ambientes");
            }, 2000)

        }catch (e){
            erro("NIF ou Senha incorretos.");
        }
    }

    return (
        <main className={styles.login_page}>
            <section
                className={styles.login_banner}
                aria-label="Apresentação do sistema"
            >
                <img
                    src="/imgs/Imagem%20do%20login.png"
                    alt="Imagem de fundo relacionada à tecnologia"
                    className={styles.banner_image}
                />

                <div className={styles.banner_overlay}></div>

                <div className={styles.banner_content}>
                    <img
                        src="/imgs/Logo%20Senai.png"
                        alt="Logo do SENAI"
                        className={styles.senai_logo}
                    />

                    <h2>Gestão de patrimônios</h2>

                    <p className={styles.banner_content_text}>
                        Controle, organização e transparência do patrimônio com eficiência.
                    </p>
                </div>
            </section>

            <section
                className={styles.login_area}
                aria-label="Formulário de login"
            >
                <form onSubmit={login} className={styles.login_form}>
                    <h1>Login</h1>

                    <div className={styles.form_group}>
                        <label htmlFor="nif">NIF:</label>

                        <input
                            type="text"
                            id="nif"
                            name="nif"
                            placeholder="Insira o seu NIF"
                            value={nif}
                            onChange={(e) => setNif(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.form_group}>
                        <label htmlFor="senha">Senha:</label>

                        <div className={styles.password_field}>
                            <input
                                type="password"
                                id="senha"
                                name="senha"
                                placeholder="Insira a sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />

                            <button
                                type="button"
                                className={styles.show_password}
                                aria-label="Mostrar senha"
                            >
                                👁
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={styles.login_button}
                    >
                        Entrar
                    </button>
                </form>
            </section>
        </main>
    );
}
