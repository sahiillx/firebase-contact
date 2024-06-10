// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { get } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "vite-contact-9d83a.firebaseapp.com",
  projectId: "vite-contact-9d83a",
  storageBucket: "vite-contact-9d83a.appspot.com",
  messagingSenderId: import.meta.env.MS_ID,
  appId: import.meta.env.APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
