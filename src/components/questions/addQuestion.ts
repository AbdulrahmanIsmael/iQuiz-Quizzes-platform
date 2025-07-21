import { getQuestionCard } from "../../constants/createQuiz-constants";

export default class AddQuestion {
  private static addQuestionBtn = <HTMLButtonElement>(
    document.getElementById("add-question-btn")
  );
  private static questionCard = getQuestionCard;
  private static counter = 1;

  public static addQuestion() {
    this.addQuestionBtn.addEventListener("click", (e: Event) => {
      const questionCardsContainer = <HTMLDivElement>(
        (e.target as HTMLButtonElement).parentElement?.previousElementSibling
      );
      this.counter++;
      questionCardsContainer.innerHTML += this.questionCard(this.counter);
    });
  }
}
