import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QuerySnapshot,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../features/firebase";
import { T_whereConstraintType } from "../types/firebase-types";

export class FirestoreControl {
  public collectionRef: CollectionReference;
  public documentRef: DocumentReference;
  constructor(public collectionPath: string, public documentPath: string) {
    this.collectionRef = collection(db, this.collectionPath);
    this.documentRef = doc(this.collectionRef, this.documentPath);
  }

  public async getDocument(): Promise<DocumentData | null> {
    const docSnapshot: DocumentSnapshot = await getDoc(this.documentRef);
    if (docSnapshot.exists()) {
      return docSnapshot.data();
    }
    return null;
  }

  public static async getDocumentFast(
    ref: DocumentReference
  ): Promise<DocumentData | null> {
    const docSnapshot: DocumentSnapshot = await getDoc(ref);
    if (docSnapshot.exists()) {
      return docSnapshot.data();
    }
    return null;
  }

  public async getQueriedDocuments(
    orderConstraint?: string,
    isDesc?: boolean,
    limitConstraint?: number,
    whereConstraint?: T_whereConstraintType
  ) {
    const queryCollection = query(
      this.collectionRef,
      orderBy(orderConstraint as string, isDesc ? "desc" : "asc"),
      limit(limitConstraint as number),
      where(
        (whereConstraint as T_whereConstraintType)[0],
        (whereConstraint as T_whereConstraintType)[1],
        (whereConstraint as T_whereConstraintType)[2]
      )
    );
    const docsSnapshot: QuerySnapshot = await getDocs(queryCollection);
    if (docsSnapshot.empty) {
      return null;
    }
    const docs: DocumentSnapshot[] = [];
    docsSnapshot.forEach((doc: DocumentData) => {
      if (doc.exists()) {
        docs.push(doc.data());
      }
    });
    return docs;
  }

  public async getAllDocuments() {
    const docsSnapshot = await getDocs(this.collectionRef);
    const docs: DocumentSnapshot[] = [];
    docsSnapshot.forEach((doc: DocumentData) => {
      if (doc.exists()) {
        docs.push(doc.data());
      }
    });
    return docs.length > 0 ? docs : null;
  }

  public async setDocument(
    data: DocumentData,
    isId: boolean,
    merge?: boolean
  ): Promise<boolean> {
    try {
      if (isId) {
        await setDoc(this.documentRef, data, {
          merge: merge ? true : false,
        });
      } else {
        await addDoc(this.collectionRef, data);
      }
      return true;
    } catch (error) {
      console.error("Something went wrong: ", error);
      return false;
    }
  }

  public async updateDocument(data: DocumentData) {
    try {
      if (data) {
        await updateDoc(this.documentRef, data);
        return true;
      }
    } catch (error) {
      console.error("Something went wrong: ", error);
      return false;
    }
  }

  public async deleteDocument() {
    try {
      await deleteDoc(this.documentRef);
      return true;
    } catch (error) {
      console.error("Something went wrong: ", error);
      return false;
    }
  }
}
