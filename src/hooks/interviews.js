import { ref, uploadBytesResumable } from "firebase/storage"
import { stg } from "../configuration/firebase"

export const useInterviews = () => {
    const uploadAudioToServer = async (file) => {
        let id = crypto.randomUUID()
        let format = file.type.split("/")[1]
        let stgRef = ref(stg, `/interviews/${id}.${format}`)
        let task = uploadBytesResumable(stgRef, file)
        task.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('uploaded: ' + progress + '%');
        }, (error) => console.log(error),
            () => {
                console.log("Completed upload")
            }
        )
    }

    return { uploadAudioToServer }
}