import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA13d6_Ox8jBxO2_kXMQzNTREigN6QgeRo",
  authDomain: "blog-app-33b64.firebaseapp.com",
  projectId: "blog-app-33b64",
  storageBucket: "blog-app-33b64.firebasestorage.app",
  messagingSenderId: "12584740282",
  appId: "1:12584740282:web:5397963c5e8e8f0348e983",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
