// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebase = require("firebase/app");

const firebaseConfig = {
  apiKey: "AIzaSyA-s9rMh2K9dDqJAERWj6EyQ4Qj3hlIRHg",
  authDomain: "litterpic-fa0bb.firebaseapp.com",
  projectId: "litterpic-fa0bb",
  storageBucket: "litterpic-fa0bb.appspot.com",
  messagingSenderId: "445985363997",
  appId: "1:445985363997:web:3588d2d945f426835e4ef4",
  measurementId: "G-64THCF0R4S",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
