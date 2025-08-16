import {
  arrayUnion,
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import toggleErrorMsg from "../../../authentication/modules/toggleErrorMsg";
import { auth, db } from "../../../firebase";
import { T_question } from "../../types/createQuiz-types";

export default class CreateQuiz {
  private static submitBtn = <HTMLButtonElement>(
    document.getElementById("submit-quiz-btn")
  );
  private static errorMsg = <HTMLDivElement>(
    document.getElementById("quiz-error-msg")
  );
  private static quizTitle = <HTMLInputElement>(
    document.getElementById("quiz-title")
  );
  private static quizDesc = <HTMLTextAreaElement>(
    document.getElementById("quiz-desc")
  );

  private static getQuestions(): T_question[] | null {
    // initialize the questions array
    const questions: T_question[] = [];
    const questionCards: NodeListOf<HTMLDivElement> = document.querySelectorAll(
      "#questions-section > .question-card"
    );
    // handling if there are not questions
    if (!questionCards || questionCards.length === 0) {
      toggleErrorMsg(this.errorMsg, true, "Please Enter at least one question");
      return null;
    }

    // looping through the questions to process and add them to the array
    for (const question of Array.from(questionCards)) {
      // getting the questions details
      const questionType: string = (
        (question as HTMLDivElement).querySelector(
          ".question-type"
        ) as HTMLSelectElement
      ).value;
      const questionTitle: string = (
        (question as HTMLDivElement).querySelector(
          ".question-title"
        ) as HTMLInputElement
      ).value.trim();
      let solution: string = "";
      let options: string[] | null = null;

      // handling errors
      if (!questionTitle) {
        toggleErrorMsg(
          this.errorMsg,
          true,
          "Please write the questions' title"
        );
        return null;
      }

      if (questionType === "open") {
        const openAnswer = (
          (question as HTMLDivElement).querySelector(
            ".open-answer"
          ) as HTMLInputElement
        ).value.trim();
        if (openAnswer) {
          solution = openAnswer;
        }
      } else {
        // getting the options
        const choices: HTMLInputElement[] = Array.from(
          (question as HTMLDivElement).querySelectorAll(
            ".choices-section input[type='text']"
          )
        );
        if (choices && choices.length > 1) {
          options = choices
            .map((input) => input.value.trim())
            .filter((option) => option.trim() !== "");
          if (options.length < 2) {
            toggleErrorMsg(
              this.errorMsg,
              true,
              "Please Enter at least 2 choices for each multiple-choices question!"
            );
            return null;
          }
        }
        // find which choice is checked (the solution)
        const radios = Array.from(
          (question as HTMLDivElement).querySelectorAll(
            ".choices-section input[type='radio']"
          )
        );
        const checkedSolution = radios.find(
          (radio) => (radio as HTMLInputElement).checked
        ) as HTMLInputElement;
        if (checkedSolution) {
          solution = (
            checkedSolution?.nextElementSibling as HTMLInputElement
          )?.value.trim();
        } else {
          toggleErrorMsg(
            this.errorMsg,
            true,
            "Please choose solution for each multiple-choices question!"
          );
          return null;
        }
      }
      // pushing the question to the array of questions
      if (solution && options) {
        questions.push({
          type: questionType,
          question: questionTitle,
          solution: solution,
          options: options,
        });
      } else if (solution && !options) {
        questions.push({
          type: questionType,
          question: questionTitle,
          solution: solution,
        });
      } else {
        questions.push({
          type: questionType,
          question: questionTitle,
        });
      }
    }

    return questions;
  }

  public static async submitQuiz() {
    this.submitBtn.addEventListener("click", async (e: Event) => {
      e.preventDefault();
      const title: string = this.quizTitle?.value?.trim();
      const description: string = this.quizDesc?.value?.trim();
      const questions: T_question[] | null = this.getQuestions();

      // handling errors
      if (!title) {
        toggleErrorMsg(this.errorMsg, true, "Please enter the quiz title");
        setTimeout(() => toggleErrorMsg(this.errorMsg, false), 3000);
        return;
      }

      if (!questions) {
        setTimeout(() => toggleErrorMsg(this.errorMsg, false), 3000);
        return;
      }

      toggleErrorMsg(this.errorMsg, false);
      // adding the quiz to the DB and update the user details in DB for the added quiz
      const userDocID = auth.currentUser?.displayName;
      const userDocRef: DocumentReference = doc(
        db,
        "users",
        userDocID as string
      );

      const quizzesCollection: CollectionReference = collection(db, "quizzes");
      const quizDocRef: DocumentReference = doc(quizzesCollection, title);

      try {
        await setDoc(
          quizDocRef,
          {
            owner: userDocRef,
            createdAt: serverTimestamp(),
            title,
            description,
            questions: arrayUnion(...questions),
          },
          { merge: true }
        );
        await updateDoc(userDocRef, {
          numberOfCreatedQuizzes: increment(1),
          quizzes: arrayUnion(quizDocRef),
          activity: arrayUnion(quizDocRef),
        });

        // Show success message
        const successMessage = document.getElementById("success-message");
        if (successMessage) {
          successMessage.classList.remove("hidden");

          setTimeout(() => {
            window.location.href = "./dashboard.html";
          }, 3000);
        }
      } catch (error) {
        console.error("Something went wrong: ", error);
        toggleErrorMsg(
          this.errorMsg,
          true,
          "Something went wrong! Please try again later"
        );
        setTimeout(() => {
          toggleErrorMsg(this.errorMsg, false);
        }, 3000);
      }
    });
  }
}
