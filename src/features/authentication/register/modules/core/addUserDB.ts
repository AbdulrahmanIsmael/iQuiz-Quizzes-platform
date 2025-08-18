import { serverTimestamp } from "firebase/firestore";
import { FirestoreControl } from "../../../../../utils/firestoreControl";

export async function addUserToDB(username: string, email: string) {
  const addUserOperation = new FirestoreControl("users", username);
  try {
    await addUserOperation.setDocument(
      {
        username: username,
        email: email,
        createdAt: serverTimestamp(),
        quizzes: [],
        numberOfCreatedQuizzes: 0,
        solved: [],
        numberOfSolvedQuizzes: 0,
        activity: [],
      },
      true
    );
  } catch (error: any) {
    console.error("Something went wrong: ", error);
    throw new Error(error);
  }
}
