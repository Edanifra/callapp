import styles from "./dashboard.module.css";
import { useRecordAudio } from "../../hooks/recordAudio";
import { useInterviews } from "../../hooks/interviews";

const Dashboard = () => {
    const { 
        formatTime, isCalling, audioUrl, isMuted, setAudioUrl, 
        handleEndCall, handleStartCall, seconds, toggleMute,
        fileResult
    } = useRecordAudio()

    const { uploadAudioToServer } = useInterviews()

    const handleUpload = () => {
        uploadAudioToServer(fileResult)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.head}>
                <h3>Audio analysis demostration</h3>
                <p>Record audio and send it to our model</p>
            </div>

            <div className={styles.body}>
                <div className={styles.alertIcon}></div>
                <span>
                    <h3>{isCalling ? "Recording audio" : "Before you continue:"}</h3>
                    {isCalling && (
                        <h1 className={styles.timer}>{formatTime(seconds)}</h1>
                    )}
                    <p>
                        {isCalling
                            ? "Recording audio"
                            : "This app needs microphone permissions"}
                    </p>
                </span>
            </div>

            {audioUrl && !isCalling && (
                <div className={styles.recordingPlayer}>
                    <h4>Audio record:</h4>
                    <audio src={audioUrl} controls className={styles.audioElement} />

                    <div className={styles.playerActions}>
                        {/* USAR ETIQUETA 'a' PARA DESCARGAS EXTERNAS/BLOBS */}
                        <a 
                            href={audioUrl} 
                            download="Llamada-grabada.wav" 
                            className={styles.IA}
                        >
                            Download
                        </a>

                        <button
                            onClick={handleUpload}
                            className={styles.IA}>
                                Send to IA server
                        </button>

                        <button onClick={() => setAudioUrl(null)} className={styles.IA}>
                            Delete
                        </button>
                    </div>
                </div>
            )}
            
            <div className={styles.action}>
                <div className={styles.inCallActions}>
                    <button
                        onClick={isCalling ? handleEndCall : handleStartCall}
                        className={styles.action}
                    >
                        {!isCalling ? "Record" : "Finish"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;