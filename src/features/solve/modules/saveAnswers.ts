import { showMsg } from "../../../components/message/showMessage";

export function saveAnswers() {
  const saveBtn = document.querySelector("#save-answer-btn-container > button");
  const qParam = +(new URLSearchParams(window.location.search).get(
    "q"
  ) as string);
  const questionType = JSON.parse(localStorage.getItem("solve") as string)
    .questions[qParam - 1].type;
  saveBtn?.addEventListener("click", (e: Event) => {
    e.preventDefault();
    if (questionType === "multiple") {
      const options =
        (
          e.target as HTMLButtonElement
        ).parentElement?.previousElementSibling?.firstElementChild?.querySelectorAll(
          "input"
        ) || null;
      Array.from(options as NodeListOf<HTMLInputElement>).forEach(
        (option: HTMLInputElement) => {
          if (option.checked) {
            const answers = localStorage.getItem("answers")
              ? JSON.parse(localStorage.getItem("answers") as string)
              : [];
            answers[qParam - 1] = {
              checkedAnswer: option.value,
              questionType: questionType,
            };
            localStorage.setItem("answers", JSON.stringify(answers));
          }
        }
      );
    } else {
      const openAnswer =
        (
          e.target as HTMLButtonElement
        ).parentElement?.previousElementSibling?.firstElementChild?.querySelector(
          "textarea"
        ) || null;
      if (openAnswer) {
        const answers = localStorage.getItem("answers")
          ? JSON.parse(localStorage.getItem("answers") as string)
          : [];
        answers[qParam - 1] = {
          checkedAnswer: openAnswer.value,
          questionType: questionType,
        };
        localStorage.setItem("answers", JSON.stringify(answers));
      }
    }
    const successMsg = <HTMLDivElement>(
      document.getElementById("success-message")
    );
    showMsg(successMsg, null, "Answer has been saved");
  });
}
