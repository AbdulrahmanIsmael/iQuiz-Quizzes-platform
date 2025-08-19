import { DocumentReference, Timestamp } from "firebase/firestore";
import { T_question } from "../features/create/types/createQuiz-types";

export interface T_quiz {
  title: string;
  description?: string;
  owner: DocumentReference;
  createdAt: Timestamp;
  questions: T_question[];
}
