import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBd-5_yz-OI9DaOmMcmxuR1yaFoxvLKoHs",
  authDomain: "chat-3625d.firebaseapp.com",
  projectId: "chat-3625d",
  storageBucket: "chat-3625d.appspot.com",
  messagingSenderId: "838555346997",
  appId: "1:838555346997:web:0271eeca4d467ee7d7297c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
