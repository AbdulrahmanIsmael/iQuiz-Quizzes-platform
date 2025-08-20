import { T_answer, T_result } from "../../../../types/dashboard-types";
import { T_question } from "../../../create/types/createQuiz-types";
import { IsSimilar } from "./isSimilar";

export class Score {
  constructor(public questions: T_question[], private _answers: T_answer[]) {}
  get answers(): T_answer[] {
    return this._answers;
  }

  set answers(newAnswers: T_answer[]) {
    this._answers = newAnswers;
  }

  public getScore(): T_result {
    let fullScore = this.questions.length;
    let score = 0;
    let percent = 0;
    this.questions.forEach(async (question, index) => {
      if (question.type === "multiple") {
        if (question.solution === this._answers[index].checkedAnswer) {
          score++;
        } else {
          const similarityOperation = new IsSimilar(
            question.solution as string,
            this._answers[index].checkedAnswer
          );
          const isCorrect = await similarityOperation.isSimilar();
          if (isCorrect) {
            score++;
          }
        }
      }
    });
    percent = (score / fullScore) * 100;
    return { score, fullScore, percent };
  }
}
