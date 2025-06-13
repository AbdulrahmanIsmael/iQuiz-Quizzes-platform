import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { firebaseConfig } from "../../constants/firebase-constants";

// Initialize Firebase App
const app: FirebaseApp = initializeApp(firebaseConfig);

// Getting Firebase Authentication service
export const auth: Auth = getAuth(app);
