import { FieldPath, WhereFilterOp } from "firebase/firestore";

export interface I_firebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export type T_whereConstraintType = [
  string | FieldPath,
  WhereFilterOp,
  string | unknown
];
