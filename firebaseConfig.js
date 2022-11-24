import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBdV51wqbTLQhBLniawORjPESqplWVHPgk",
    authDomain: "toothcare-mobile-9115b.firebaseapp.com",
    projectId: "toothcare-mobile-9115b",
    storageBucket: "toothcare-mobile-9115b.appspot.com",
    messagingSenderId: "373833652081",
    appId: "1:373833652081:web:469198cd906f0181c8c8d0"
};

export const appDB = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
