// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // ✅ Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB68BXfSiXFSgXSap9mxGOPyizS1rwgtIM",
  authDomain: "vastra-3e9c2.firebaseapp.com",
  projectId: "vastra-3e9c2",
  storageBucket: "vastra-3e9c2.appspot.com",
  messagingSenderId: "1033088899182",
  appId: "1:1033088899182:web:343346790d28d1ff522e7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Auth & Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);   // ✅ Add this

export default app;
