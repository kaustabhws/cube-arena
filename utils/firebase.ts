import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

process.env.FIREBASE_API_KEY

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "cube-app-74693.firebaseapp.com",
  projectId: "cube-app-74693",
  storageBucket: "cube-app-74693.appspot.com",
  messagingSenderId: "773248876075",
  appId: "1:773248876075:web:9427f62f3643636f75b46e"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
