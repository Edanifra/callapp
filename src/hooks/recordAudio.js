import { useEffect, useRef, useState } from "react";

export const useRecordAudio = () => {
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


    return { 
        isCalling, 
        setIsCalling, 
        stream, 
        setStream, 
        seconds, 
        setSeconds, 
        isMuted, 
        setIsMuted, 
        audioUrl, 
        setAudioUrl,
        handleStartCall,
        handleEndCall,
        formatTime,
        toggleMute
    }
}