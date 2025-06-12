// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "mern-estate-5cb56.firebaseapp.com",
  projectId: "mern-estate-5cb56",
  storageBucket: "mern-estate-5cb56.appspot.com",
  messagingSenderId: "998363763012",
  appId: "1:998363763012:web:efd11656f6c32cf7828711"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);