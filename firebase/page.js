// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD6CLRrx_PtlEQfuKIXZMG0X81h0ozKb4I",
  authDomain: "tys-proj.firebaseapp.com",
  projectId: "tys-proj",
  storageBucket: "tys-proj.appspot.com",
  messagingSenderId: "284477659770",
  appId: "1:284477659770:web:7930641d3cf683046139c3",
  measurementId: "G-DDZFP75YTX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export let firebaseAnalytics;
if (typeof window !== 'undefined') {
    firebaseAnalytics = getAnalytics(app)
} else {
    null;
}