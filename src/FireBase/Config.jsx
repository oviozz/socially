
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBzwLm6Ltt7y8rm7DcnDwUZ7TlfO2mqu2I",
    authDomain: "socially-fcb0b.firebaseapp.com",
    projectId: "socially-fcb0b",
    storageBucket: "socially-fcb0b.appspot.com",
    messagingSenderId: "781060892006",
    appId: "1:781060892006:web:c324d4e0a775f8a41494a7",
    measurementId: "G-C7FZ458Y96"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
