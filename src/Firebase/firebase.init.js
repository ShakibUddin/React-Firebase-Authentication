import { initializeApp } from "firebase/app";
import firebaseConfig from "../Configuration/firebase.config";

function initializeFirebase() {
    initializeApp(firebaseConfig);
}

export default initializeFirebase;