import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";

// Firebase Console Configuration Object
const firebaseConfig = {
  apiKey: "AIzaSyCCRWsRu_qi7FMvZwcJGnklCSdapMHS58Q",
  authDomain: "iquiz-website.firebaseapp.com",
  projectId: "iquiz-website",
  storageBucket: "iquiz-website.firebasestorage.app",
  messagingSenderId: "335011489689",
  appId: "1:335011489689:web:f075121a1f7a132c74d508",
  measurementId: "G-YEQ7EEHRVR",
};

// Initialize Firebase App
const app: FirebaseApp = initializeApp(firebaseConfig);

// Getting Firebase Authentication service
export const auth: Auth = getAuth(app);
