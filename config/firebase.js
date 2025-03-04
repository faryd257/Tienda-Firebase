
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};


console.log("🔥 FIREBASE CONFIG:");
console.log("API KEY:", import.meta.env.VITE_FIREBASE_API_KEY);
console.log("AUTH DOMAIN:", import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
console.log("PROJECT ID:", import.meta.env.VITE_FIREBASE_PROJECT_ID);
console.log("STORAGE BUCKET:", import.meta.env.VITE_FIREBASE_STORAGE_BUCKET);
console.log("MESSAGING SENDER ID:", import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID);
console.log("APP ID:", import.meta.env.VITE_FIREBASE_APP_ID);
console.log("MEASUREMENT ID:", import.meta.env.VITE_FIREBASE_MEASUREMENT_ID);


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);


const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
  login_hint: "", 
});


if (window.location.hostname === "localhost") {
  auth.useDeviceLanguage();
}


export { auth, db, googleProvider, analytics };