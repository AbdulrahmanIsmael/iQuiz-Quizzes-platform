import { DocumentData } from "firebase/firestore";
import { FirestoreControl } from "../../../utils/firestoreControl";

export function enableStartQuizEvent() {
  // add click event on start quiz button
  const startQuizBtns = Array.from(
    document.querySelectorAll("#start-quiz-btn")
  );
  if (startQuizBtns.length > 0) {
    startQuizBtns.forEach((btn) => {
      btn.addEventListener("click", async (e: Event) => {
        e.preventDefault();
        const quizTitle = (
          e.target as HTMLElement
        )?.previousElementSibling?.firstElementChild?.textContent?.trim();
        const firestoreOperation = new FirestoreControl(
          "quizzes",
          quizTitle as string
        );

        const quiz: DocumentData | null =
          await firestoreOperation.getDocument();
        const ownerUsername = await FirestoreControl.getDocumentFast(
          (quiz as DocumentData).owner
        );

        localStorage.removeItem("solve");
        localStorage.setItem(
          "solve",
          JSON.stringify({
            ...quiz,
            owner: (ownerUsername as DocumentData).username,
          })
        );
        window.location.href = `../../../pages/solve.html?q=${encodeURIComponent(
          1
        )}`;
      });
    });
  }
}
