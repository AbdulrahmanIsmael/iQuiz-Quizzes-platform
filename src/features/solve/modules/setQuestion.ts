import { getQuestion } from "../../../constants/solve-constants";
import { T_question } from "../../create/types/createQuiz-types";

export function setQuestion() {
  const qParam: number = +(new URLSearchParams(window.location.search)
    .get("q")
    ?.trim() as string);
  const question: T_question = JSON.parse(
    localStorage.getItem("solve") as string
  ).questions[qParam - 1];
  const questionContainer: HTMLDivElement | null =
    document.querySelector(".question-content");
  (questionContainer as HTMLDivElement).innerHTML = getQuestion(
    qParam,
    question.type,
    question.question,
    question.options as string[]
  );
}
