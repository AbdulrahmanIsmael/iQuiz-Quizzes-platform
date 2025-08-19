import { getQuestionButton } from "../../../constants/solve-constants";
import { T_question } from "../../create/types/createQuiz-types";

export function insertPagination() {
  const searchParams = window.location.search;
  const qParam: number = +(new URLSearchParams(searchParams).get(
    "q"
  ) as string);
  const questions: number[] = JSON.parse(
    localStorage.getItem("solve") as string
  ).questions.map((q: T_question, i: number) => q && i + 1);
  const paginationContainer = <HTMLDivElement>(
    document.getElementById("pagination-container")
  );
  if (paginationContainer) {
    questions.forEach((i: number) => {
      const isActive = qParam === i ? true : false;
      paginationContainer.innerHTML += getQuestionButton(i, isActive);
    });
  }
}
