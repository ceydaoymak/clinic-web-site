import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvfjrRMLY28UpfrRwzCkEyJmg_aH9LXGc",
  authDomain: "ceydaoymak1.firebaseapp.com",
  projectId: "ceydaoymak1",
  storageBucket: "ceydaoymak1.firebasestorage.app",
  messagingSenderId: "232621319836",
  appId: "1:232621319836:web:1a690f0c986baf7cc9af59",
  measurementId: "G-2XL5QVV8NP"
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const auth = getAuth(app);
