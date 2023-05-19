import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: "wauwt-e4b32.firebaseapp.com",
  projectId: "wauwt-e4b32",
  storageBucket: "wauwt-e4b32.appspot.com",
  messagingSenderId: "496565686145",
  appId: "1:496565686145:web:414ba150ef96da09632280",
  measurementId: "G-9E67M2FHPK",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
