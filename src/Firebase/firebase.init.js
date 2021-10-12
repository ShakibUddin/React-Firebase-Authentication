import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

function initializeFirebase() {
    initializeApp(firebaseConfig);
}

export default initializeFirebase;