import { getQuiz } from "../../../constants/exploreQuizzes-constants";
import { T_quiz } from "../../../types/exploreQuiz-types";

export async function insertQuizzes(
  parent: HTMLElement,
  loading: HTMLElement,
  quizzes: T_quiz[]
) {
  const noQuizzes = parent.firstElementChild;
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
      if (quiz.owner) {
        return getQuiz(quiz, quiz.owner.id);
      } else {
        return getQuiz(quiz, "Unknown");
      }
    })
  );

  parent.innerHTML = quizzesCards.join("");
  loading.classList.add("hidden");
  (parent.parentElement as HTMLElement).classList.remove("hidden");
}
