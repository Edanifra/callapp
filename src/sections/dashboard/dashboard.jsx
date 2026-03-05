import { useEffect, useRef, useState } from "react"; // Eliminamos Link si no se usa para rutas
import styles from "./dashboard.module.css";

const Dashboard = () => {
    const [isCalling, setIsCalling] = useState(false);
    const [stream, setStream] = useState(null);
    const [seconds, setSeconds] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const handleStartCall = async () => {
        try {
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setStream(audioStream);
            setIsCalling(true);
            setAudioUrl(null);
            setIsMuted(false); // Resetear mute al empezar

            const mediaRecorder = new MediaRecorder(audioStream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
                const url = URL.createObjectURL(audioBlob);
                setAudioUrl(url);
            };

            mediaRecorder.start();
        } catch (error) {
            console.error("Error al iniciar llamada: ", error);
        }
    };

    const handleEndCall = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
        }

        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        setStream(null);
        setIsCalling(false);
    };

    useEffect(() => {
        let interval = null;
        if (isCalling) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        } else {
            setSeconds(0);
        }
        return () => clearInterval(interval);
    }, [isCalling]);

    const formatTime = (totalSeconds) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const toggleMute = () => {
        if (stream) {
            const newMuteState = !isMuted;
            stream.getAudioTracks().forEach(track => {
                // enabled = true significa que se escucha. 
                // Si mute es true, enabled debe ser false.
                track.enabled = isMuted; 
            });
            setIsMuted(newMuteState);
        }
    };

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