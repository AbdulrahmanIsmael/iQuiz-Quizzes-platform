import { DocumentReference } from "firebase/firestore";

export interface T_activity {
  type: string;
  quiz: DocumentReference;
  answers: T_answer[];
  result: T_result;
}

export interface T_answer {
  checkedAnswer: string;
  type: "open" | "multiple";
}

export interface T_solvedQuiz {
  quiz: DocumentReference;
  answer: T_answer[];
  result: T_result;
}

export interface T_result {
  score: number;
  fullScore: number;
  percent: number;
}
