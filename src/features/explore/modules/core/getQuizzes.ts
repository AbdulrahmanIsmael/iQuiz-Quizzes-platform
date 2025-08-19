import {
  collection,
  doc,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  Query,
  QuerySnapshot,
} from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { T_quiz } from "../../../../types/exploreQuiz-types";
import { showMsg } from "../../../../components/message/showMessage";
//import { showMsg } from "../../../components/message/showMessage";

export class GetQuizzes {
  private static usersCollection = collection(db, "users");
  private static quizzesCollection = collection(db, "quizzes");

  public static async getRecentQuizzes() {
    const quizzesQuery: Query = query(
      this.quizzesCollection,
      orderBy("createdAt", "desc"),
      limit(10)
    );
    const quizzesDocs: QuerySnapshot = await getDocs(quizzesQuery);
    const quizzes: T_quiz[] = [];
    if (!quizzesDocs.empty) {
      quizzesDocs.forEach((doc) => {
        if (doc.exists()) {
          quizzes.push(doc.data() as T_quiz);
        }
      });
    }
    return quizzes;
  }

  private static async getUserID(): Promise<string | undefined> {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user.displayName ?? undefined);
        } else {
          resolve(undefined);
        }
      });
    });
  }

  public static async getUserQuizzes() {
    const quizzes: T_quiz[] = [];
    const username = await this.getUserID();
    if (username) {
      const userDocRef: DocumentReference = doc(this.usersCollection, username);
      const userDocSnapshot: DocumentSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userQuizzes: DocumentReference[] = userDocSnapshot.data().quizzes;
        const lastTenUserQuizzes =
          userQuizzes.length > 10 ? userQuizzes.slice(-10) : userQuizzes;
        lastTenUserQuizzes.forEach(async (quiz: DocumentReference) => {
          const quizDoc: DocumentSnapshot = await getDoc(quiz);
          if (quizDoc.exists()) {
            quizzes.push(quizDoc.data() as T_quiz);
          }
        });
      }
    } else {
      console.error("Something went wrong");
      const errorMsg = document.getElementById("error-message");
      await signOut(auth);
      showMsg(errorMsg as HTMLDivElement, "../../pages/sign-in.html");
    }
    return quizzes;
  }
}
