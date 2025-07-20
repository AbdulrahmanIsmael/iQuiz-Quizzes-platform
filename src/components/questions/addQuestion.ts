import { QUESTION_CARD } from "../../constants/createQuiz-constants";

export default class AddQuestion {
  private static addQuestionBtn = <HTMLButtonElement>(
    document.getElementById("add-question-btn")
  );
  private static questionCard = QUESTION_CARD;

  public static addQuestion() {
    this.addQuestionBtn.addEventListener("click", (e: Event) => {
      const questionCardsContainer = <HTMLDivElement>(
        (e.target as HTMLButtonElement).parentElement?.previousElementSibling
      );
      questionCardsContainer.innerHTML += this.questionCard;
    });
  }
}
