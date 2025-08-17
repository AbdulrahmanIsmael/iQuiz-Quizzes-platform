import { T_quiz } from "../types/exploreQuiz-types";

export async function getQuiz(quiz: T_quiz, owner: string) {
  return `
    <div
      class="card !py-4 !px-1 bg-white/90 border-2 border-purple-100 shadow-md rounded-xl hover:shadow-xl transition-natural h-full flex flex-col"
    >
      <div class="flex flex-col gap-y-2 p-4 flex-1">
        <h3 class="text-purple-800 text-xl font-bold">
          ${quiz.title}
        </h3>
        <small class="text-sm text-purple-500">${owner}</small>
        <p
          class="text-gray-700 leading-6 text-justify -tracking-normal xl:-tracking-wide"
        >
          ${quiz.description}
        </p>
      </div>
      <button
        type="button"
        class="filled-btn !mt-3 border border-purple-400 transition-natural"
        onclick="localStorage.setItem("quizToSolve", ${quiz})"
      >
        Start Quiz
      </button>
    </div>
  `;
}
