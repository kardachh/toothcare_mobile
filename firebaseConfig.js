import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAmWuAcPUfYcrG7TBP2T5KHrv15v1OQTQ4",
    authDomain: "toothcare-mobile.firebaseapp.com",
    databaseURL: "https://toothcare-mobile-default-rtdb.firebaseio.com",
    projectId: "toothcare-mobile",
    storageBucket: "toothcare-mobile.appspot.com",
    messagingSenderId: "29674686655",
    appId: "1:29674686655:web:152aef2822cfac04f61e0a"
};

export const appDB = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
