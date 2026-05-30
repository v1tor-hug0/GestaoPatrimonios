import styles from "./modal.module.css";

const ModalJustificativa = () => {
    return (
        <>
            {/* MODAL JUSTIFICATIVA */}
            <section className={styles.modal_overlay}>

                <article
                    className={`${styles.modal_container} ${styles.modal_justificativa}`}
                >
                    <a
                        href="#"
                        className={styles.modal_close}
                    >
                        x
                    </a>

                    <h1 className={styles.modal_title}>
                        Justificativa
                    </h1>

                    <p className={styles.modal_text}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Veritatis, quasi distinctio! Temporibus similique expedita
                        laboriosam, assumenda officia veritatis amet doloremque esse
                        obcaecati repudiandae architecto in sed facilis quas harum.
                    </p>

                </article>
            </section>
        </>
    );
};
const ModalImportar = () => {

    return (
        <>
            <section className={styles.modal_overlay}>

                <article
                    className={styles.modal_container}
                    id="modalImportar"
                >
                    <a
                        href="#"
                        className={styles.modal_close}
                    >
                        x
                    </a>

                    <h1 className={styles.modal_title}>
                        Importar novos patrimônios
                    </h1>

                    <form className={styles.modal_form}>

                        <div className={styles.modal_field}>
                            <label htmlFor="numeroPatrimonio">
                                Número do patrimônio
                            </label>

                            <input
                                type="text"
                                id="numeroPatrimonio"
                                placeholder="1245769"
                            />
                        </div>

                        <div className={styles.modal_field}>
                            <label htmlFor="denominacaoPatrimonio">
                                Denominação
                            </label>

                            <input
                                type="text"
                                id="denominacaoPatrimonio"
                                placeholder="CADEIRA GIRATÓRIA EM POLIPROPILENO PRETO"
                            />
                        </div>

                        <button className={styles.modal_button}>
                            SALVAR IMPORTAÇÃO
                        </button>

                    </form>
                </article>
            </section>
        </>
    )
}
const ModalTransferir = () => {
    return (
        <>
            <section className={styles.modal_overlay}>

                <article
                    className={styles.modal_container}
                    id="modalTransferir"
                >
                    <a
                        href="#"
                        className={styles.modal_close}
                    >
                        x
                    </a>

                    <h1 className={styles.modal_title}>
                        Transferir os patrimônios
                    </h1>

                    <form className={styles.modal_form}>

                        <div className={styles.modal_field}>

                            <label htmlFor="ambienteTransferencia">
                                Ambiente
                            </label>

                            <select id="ambienteTransferencia">

                                <option>Manutenção</option>
                                <option>Sala XX</option>
                                <option>Sala XX</option>

                            </select>

                        </div>

                        <div className={styles.modal_field}>

                            <label htmlFor="motivoTransferencia">
                                Motivo da transferência
                            </label>

                            <textarea
                                id="motivoTransferencia"
                                placeholder="Lorem"
                            />

                        </div>

                        <button className={styles.modal_button}>
                            TRANSFERIR
                        </button>

                    </form>
                </article>
            </section>
        </>
    );
}

export { ModalJustificativa, ModalImportar, ModalTransferir };