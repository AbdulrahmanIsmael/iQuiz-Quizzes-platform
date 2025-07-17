import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../../constants/firebase-constants";

// Initialize Firebase App
const app: FirebaseApp = initializeApp(firebaseConfig);

// Getting Firebase Authentication service
export const auth: Auth = getAuth(app);

// Get access to the firebase firestore database
export const db: Firestore = getFirestore(app);
