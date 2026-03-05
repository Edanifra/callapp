// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDAAg4t7nws2tuJ3y_qphisI4YKAhyQLg",
  authDomain: "ai-server-60c1a.firebaseapp.com",
  projectId: "ai-server-60c1a",
  storageBucket: "ai-server-60c1a.firebasestorage.app",
  messagingSenderId: "320687230294",
  appId: "1:320687230294:web:b221a0c4a7c978f59a1af7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const stg = getStorage(app)

export { stg, app as default }