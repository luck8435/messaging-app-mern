import { initializeApp } from 'firebase/app'
import {GoogleAuthProvider,getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import 'firebase/storage'
import 'firebase/database'; // for realtime database

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA3IxXkbhqwvD2IB5qdbQO_xFpPhfAXGGw",
    authDomain: "messaging-app-fbf0b.firebaseapp.com",
    projectId: "messaging-app-fbf0b",
    storageBucket: "messaging-app-fbf0b.appspot.com",
    messagingSenderId: "884646281173",
    appId: "1:884646281173:web:de399a75374c4e38d0475c",
    measurementId: "G-5VZ2YB1V96"
  };

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const provider = new GoogleAuthProvider()
export {auth, provider }
export default db