import { arrayUnion, increment } from "firebase/firestore";
import { showMsg } from "../../../../components/message/showMessage";
import { T_quiz } from "../../../../types/exploreQuiz-types";
import { FirestoreControl } from "../../../../utils/firestoreControl";
import { auth } from "../../../firebase";

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
      await submitQuizOperation.updateDocument({
        activity: arrayUnion({
          type: "solved",
          quiz: quizOperation.documentRef,
          answers: answers,
        }),
        solved: arrayUnion({
          quiz: quizOperation.documentRef,
          answers: answers,
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
