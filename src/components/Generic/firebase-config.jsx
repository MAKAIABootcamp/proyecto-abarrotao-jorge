// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBl15lGbdXxaDm44X6W418fOCc_7-vWd1Q",
  authDomain: "sprint4-61808.firebaseapp.com",
  projectId: "sprint4-61808",
  storageBucket: "sprint4-61808.appspot.com",
  messagingSenderId: "384158722822",
  appId: "1:384158722822:web:4709fd5ebcef0381010c87",
  measurementId: "G-LR9ZPDBJ6N"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
