export interface T_question {
  type: "multiple" | "open";
  question: string;
  solution?: string;
  options?: string[] | null;
}
