// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyCicGHQPET2kpXAcbKuzhMezHx050k9YKA",
  authDomain: "langswap-a426a.firebaseapp.com",
  projectId: "langswap-a426a",
  storageBucket: "langswap-a426a.firebasestorage.app",
  messagingSenderId: "415578142883",
  appId: "1:415578142883:web:c867c05fdffbcde5a0a716",
  measurementId: "G-7VJSGK6R27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore DB
const db = getFirestore(app);

export { db };
