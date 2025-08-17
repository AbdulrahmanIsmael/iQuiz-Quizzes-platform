import { getDoc } from "firebase/firestore";
import { getQuiz } from "../../../constants/exploreQuizzes-constants";
import { T_quiz } from "../../../types/exploreQuiz-types";

export async function insertQuizzes(
  parent: HTMLElement,
  loading: HTMLElement,
  quizzes: T_quiz[]
) {
  const noQuizzes = parent.firstElementChild;
  console.log(quizzes);
  if (!quizzes || quizzes.length === 0) {
    loading.classList.add("hidden");
    (parent.parentElement as HTMLElement).classList.remove("hidden");
    (noQuizzes as HTMLElement)?.classList.remove("hidden");
    return;
  } else {
    noQuizzes?.classList.add("hidden");
  }
  const quizzesCards = await Promise.all(
    quizzes.map(async (quiz: T_quiz) => {
      const ownerDoc = await getDoc(quiz.owner);
      if (ownerDoc.exists()) {
        return getQuiz(quiz, ownerDoc.data().username);
      } else {
        return getQuiz(quiz, "Unknown");
      }
    })
  );

  parent.innerHTML = quizzesCards.join("");
  loading.classList.add("hidden");
  (parent.parentElement as HTMLElement).classList.remove("hidden");
}
