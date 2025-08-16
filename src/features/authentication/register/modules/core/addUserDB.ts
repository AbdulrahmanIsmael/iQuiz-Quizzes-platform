import { db } from "../../../../firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";

export async function addUserToDB(username: string, email: string) {
  try {
    const usersCollection = collection(db, "users");
    const userDoc = doc(usersCollection, username);
    await setDoc(userDoc, {
      username: username,
      email: email,
      createdAt: serverTimestamp(),
      quizzes: [],
      numberOfCreatedQuizzes: 0,
      solved: [],
      numberOfSolvedQuizzes: 0,
      activity: [],
    });
  } catch (error: any) {
    throw new Error(error);
  }
}
