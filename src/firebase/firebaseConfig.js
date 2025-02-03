// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSPDnszR8eWe5hPiyph3oG5J3YboiGaJw",
  authDomain: "precificacao-3bd81.firebaseapp.com",
  projectId: "precificacao-3bd81",
  storageBucket: "precificacao-3bd81.firebasestorage.app",
  messagingSenderId: "17657728960",
  appId: "1:17657728960:web:f36560892a6e798971c225",
  measurementId: "G-TD7743CEEF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
export const auth = getAuth(app);
export {db}
