import { onAuthStateChanged } from "firebase/auth";
import { FirestoreControl } from "../../../utils/firestoreControl";
import { auth } from "../../firebase";
import { DocumentData } from "firebase/firestore";
import { T_solvedQuiz } from "../../../types/dashboard-types";
import { getResult } from "../../../constants/dashboard-constants";

onAuthStateChanged(auth, (user) => {
  if (user) {
    return;
  }
});

export class Results {
  private static resultsContainer = <HTMLElement>(
    document.getElementById("results-container")
  );
  private static getUser = async (userID: string) => {
    const userOperation = new FirestoreControl("users", userID);
    const res = await userOperation.getDocument();
    return res;
  };

  public static async insertResults(userID: string) {
    try {
      const loading = <HTMLImageElement>(
        document.querySelector("#results-container img")
      );
      const noResults = <HTMLImageElement>document.getElementById("no-results");
      const userSnapshot: DocumentData | null = await this.getUser(userID);
      const solvedQuizzes: T_solvedQuiz[] = (userSnapshot as DocumentData)
        .solved;
      if (solvedQuizzes && solvedQuizzes.length > 0) {
        loading.classList.add("hidden");
        solvedQuizzes.forEach(async (quiz: T_solvedQuiz) => {
          const result = quiz.result;
          const quizOperation = new FirestoreControl("quizzes", quiz.quiz.id);
          const quizSnapshot: DocumentData | null =
            await quizOperation.getDocument();

          this.resultsContainer.innerHTML += getResult(
            quizSnapshot as DocumentData,
            result
          );
        });
      } else {
        loading.classList.add("hidden");
        noResults.classList.remove("hidden");
        console.log("no solved quizzes");
      }
    } catch (error) {
      console.error("something went wrong: ", error);
    }
  }
}
