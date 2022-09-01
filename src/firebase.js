// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhUh1zUgR94oN3fEECgq7GakWfWsohvNU",
  authDomain: "mtpuerto-88ccb.firebaseapp.com",
  projectId: "mtpuerto-88ccb",
  storageBucket: "mtpuerto-88ccb.appspot.com",
  messagingSenderId: "401665846237",
  appId: "1:401665846237:web:725e2bae0db6e18779e434",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
