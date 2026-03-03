import styles from "./dashboard.module.css"

const Dashboard = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.head}>
                <h3>Interfaz de llamadas</h3>
                <p>Realiza una llamada y graba el audio</p>
            </div>
            <div className={styles.body}>
                <div className={styles.alertIcon}></div>
                <span>
                    <h3>Antes de comenzar:</h3>
                    <p>
                        Esta aplicación necesita acceso
                        a tu micrófono. Cuando hagas clic
                        en "Iniciar llamada", acepta el 
                        permiso en el diálogo que aparecerá.
                    </p>
                </span>
            </div>
            <div className={styles.action}>
                <span>
                    <img src="/icons/dot.svg"/>
                    <p>Sin llamada activa</p>
                </span>
                <button>
                    <img src="/icons/phoneWhite.svg"/>
                </button>
            </div>
            <div className={styles.foot}>
                <p>
                    La grabación comienza automáticamente
                    al conectar la llamada.
                </p>
            </div>
        </div>
    )
}

export default Dashboard