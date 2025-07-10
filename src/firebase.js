// src/firebase.js
// Import Firebase SDK modules
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBd02u4so9Wa6zCIp83QCTjdsKMq3iGoV4",
  authDomain: "campusconnect-199bb.firebaseapp.com",
  projectId: "campusconnect-199bb",
  storageBucket: "campusconnect-199bb.appspot.com", 
  messagingSenderId: "542792343581",
  appId: "1:542792343581:web:5b611b9268a0e9db44e6f4"
};

// Initialize Firebase only if not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore and Auth services
const db = getFirestore(app);
const auth = getAuth(app);

// Export for use in other parts of the app
export { db, auth };
