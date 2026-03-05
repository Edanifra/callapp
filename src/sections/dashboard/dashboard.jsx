import { useEffect, useRef, useState } from "react"; // Eliminamos Link si no se usa para rutas
import styles from "./dashboard.module.css";
import { useRecordAudio } from "../../hooks/recordAudio";

const Dashboard = () => {
    const { formatTime, isCalling, audioUrl, isMuted, setAudioUrl, handleEndCall, handleStartCall, seconds, toggleMute } = useRecordAudio()

    return (
        <div className={styles.wrapper}>
            <div className={styles.head}>
                <h3>Interfaz de llamadas</h3>
                <p>Realiza una llamada y graba el audio</p>
            </div>

            <div className={styles.body}>
                <div className={styles.alertIcon}></div>
                <span>
                    <h3>{isCalling ? "Llamada en curso..." : "Antes de comenzar:"}</h3>
                    {isCalling && (
                        <h1 className={styles.timer}>{formatTime(seconds)}</h1>
                    )}
                    <p>
                        {isCalling
                            ? "Tu micrófono está activo, Grabación en curso..."
                            : "Esta aplicación necesita acceso a tu micrófono."}
                    </p>
                </span>
            </div>

            {/* REPRODUCTOR DE GRABACIÓN */}
            {audioUrl && !isCalling && (
                <div className={styles.recordingPlayer}>
                    <h4>Grabación de la llamada:</h4>
                    <audio src={audioUrl} controls className={styles.audioElement} />

                    <div className={styles.playerActions}>
                        {/* USAR ETIQUETA 'a' PARA DESCARGAS EXTERNAS/BLOBS */}
                        <a 
                            href={audioUrl} 
                            download="Llamada-grabada.wav" 
                            className={styles.download}
                        >
                            Descargar grabación
                        </a>

                        <button onClick={() => setAudioUrl(null)} className={styles.deleteBtn}>
                            Eliminar
                        </button>
                    </div>
                </div>
            )}
            
            <div className={styles.action}>
                <span>
                    <img src="/icons/dot.svg" alt="status" />
                    <p>{isCalling ? "Llamada activa." : "Sin llamada activa."}</p>
                </span>
                <div className={styles.inCallActions}>
                    {isCalling && (
                        <button onClick={toggleMute} className={styles.muteBtn}>
                            <img src={isMuted ? "/icons/microphoneoff.svg" : "/icons/microphone.svg"} alt="mute" />
                        </button>
                    )}
                    <button
                        onClick={isCalling ? handleEndCall : handleStartCall}
                        style={{ backgroundColor: isCalling ? '#ff3d3d' : '#4CAF50' }}
                    >
                        <img src="/icons/phoneWhite.svg" alt="phone" />
                    </button>
                </div>
            </div>
            <div className={styles.foot}>
                <p>La grabación comienza automáticamente al conectar la llamada.</p>
            </div>
        </div>
    );
};

export default Dashboard;