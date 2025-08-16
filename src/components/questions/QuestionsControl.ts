import { getQuestionCard } from "../../constants/createQuiz-constants";

export default class QuestionsControl {
  private static addQuestionBtn = <HTMLButtonElement>(
    document.getElementById("add-question-btn")
  );
  private static questionCard = getQuestionCard;
  private static questionCounter = 1;

  public static addQuestion() {
    this.questionCounter = 1;

    this.addFirstQuestionCard();

    this.addQuestionBtn.addEventListener("click", (e: Event) => {
      const questionCardsContainer = <HTMLDivElement>(
        (e.target as HTMLButtonElement).parentElement?.previousElementSibling
      );

      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = this.questionCard(this.questionCounter);

      const newQuestionCard = tempContainer.firstElementChild;
      if (newQuestionCard) {
        const removeBtn = newQuestionCard.querySelector(".remove-card");
        if (removeBtn) {
          removeBtn.addEventListener("click", () => {
            const card = removeBtn.closest(".question-card");
            if (card && card.parentElement) {
              card.parentElement.removeChild(card);
            }
            setTimeout(() => this.updateQuestionNumbers(), 0);
          });
        }

        questionCardsContainer.appendChild(newQuestionCard);
        this.questionCounter++;
      }
    });

    this.addRemoveListeners();
  }

  private static addRemoveListeners() {
    const removeButtons = document.querySelectorAll(".remove-card");
    removeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const card = btn.closest(".question-card");
        if (card && card.parentElement) {
          card.parentElement.removeChild(card);
        }
        setTimeout(() => this.updateQuestionNumbers(), 0);
      });
    });
  }

  private static updateQuestionNumbers() {
    const questionCards = document.querySelectorAll(
      "#questions-section > .question-card"
    );
    questionCards.forEach((card, index) => {
      const numberSpan = card.querySelector(".question-number");
      if (numberSpan) {
        numberSpan.textContent = (index + 1).toString();
      }
    });

    this.questionCounter = questionCards.length + 1;
  }

  private static addFirstQuestionCard() {
    const questionCardsContainer = document.getElementById("questions-section");
    if (!questionCardsContainer) return;

    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = this.questionCard(this.questionCounter);

    const newQuestionCard = tempContainer.firstElementChild;
    if (newQuestionCard) {
      const removeBtn = newQuestionCard.querySelector(".remove-card");
      if (removeBtn) {
        removeBtn.addEventListener("click", () => {
          const card = removeBtn.closest(".question-card");
          if (card && card.parentElement) {
            card.parentElement.removeChild(card);
          }
          setTimeout(() => this.updateQuestionNumbers(), 0);
        });
      }

      questionCardsContainer.appendChild(newQuestionCard);
      this.questionCounter++;
    }
  }
}
