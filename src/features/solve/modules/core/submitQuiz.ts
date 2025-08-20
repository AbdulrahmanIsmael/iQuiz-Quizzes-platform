import { arrayUnion, DocumentData, increment } from "firebase/firestore";
import { showMsg } from "../../../../components/message/showMessage";
import { T_quiz } from "../../../../types/exploreQuiz-types";
import { FirestoreControl } from "../../../../utils/firestoreControl";
import { auth } from "../../../firebase";
import { T_question } from "../../../create/types/createQuiz-types";
import { Score } from "./getScore";

export async function submitQuiz() {
  const submitBtn = <HTMLButtonElement>(
    document.getElementById("submit-quiz-btn")
  );
  submitBtn.addEventListener("click", async (e: Event) => {
    e.preventDefault();
    const quiz: T_quiz = JSON.parse(localStorage.getItem("solve") as string);
    const answers = JSON.parse(localStorage.getItem("answers") as string);
    const errorMsg = <HTMLDivElement>document.getElementById("error-message");
    const successMsg = <HTMLDivElement>(
      document.getElementById("success-message")
    );
    if (answers.length !== quiz.questions.length || answers.includes(null)) {
      showMsg(errorMsg, null);
    } else {
      const userID = auth.currentUser?.displayName;
      const submitQuizOperation = new FirestoreControl(
        "users",
        userID as string
      );
      const quizOperation = new FirestoreControl("quizzes", quiz.title);
      const quizSnapshot: DocumentData | null =
        await quizOperation.getDocument();

      const questions: T_question[] = (quizSnapshot as DocumentData).questions;
      const getResultOperation = new Score(questions, answers);
      const result = await getResultOperation.getScore();
      await submitQuizOperation.updateDocument({
        activity: arrayUnion({
          type: "Solved",
          quiz: quizOperation.documentRef,
          answers: answers,
          result: result,
        }),
        solved: arrayUnion({
          quiz: quizOperation.documentRef,
          answers: answers,
          result: result,
        }),
        numberOfSolvedQuizzes: increment(1),
      });
      showMsg(
        successMsg,
        "../../../../pages/dashboard.html",
        "Quiz has been submitted successfully"
      );
    }
  });
}
