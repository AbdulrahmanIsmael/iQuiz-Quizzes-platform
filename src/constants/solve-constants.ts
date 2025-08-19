export const getQuestionButton = (
  q: number,
  isActive: boolean
): string => `<button
              class="q-btn cursor-pointer w-9 h-9 rounded-full bg-purple-100 text-purple-700 font-bold flex justify-center items-center shadow hover:bg-purple-200 transition ${
                isActive ? "q-active" : ""
              }"
              aria-label="question ${q}"
            >
              ${q}
            </button>`;

export const getQuestion = (
  q: number,
  type: string,
  question: string,
  options: string[]
) => {
  const savedAnswer =
    localStorage.getItem("answers") &&
    JSON.parse(localStorage.getItem("answers") as string)[q - 1]
      ? JSON.parse(localStorage.getItem("answers") as string)[q - 1]
          ?.checkedAnswer
      : null;
  return type === "multiple"
    ? `
      <div class="flex items-center gap-x-3 mb-2">
              <span class="text-xl font-bold text-purple-700">Question ${q}</span>
            </div>
            <p class="text-lg font-medium text-gray-800 mb-4">
                ${question}${question[question.length - 1] !== "?" ? "?" : ""}
            </p>
      <div class="choices-section flex flex-col gap-y-3">
      ${options
        .map((option) => {
          return `<label class="flex items-center gap-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="answer-${q}"
                  value="${option}"
                  class="accent-purple-600"
                  ${savedAnswer === option ? "checked" : ""}
                />
                <span class="text-gray-700">${option}</span>
              </label>`;
        })
        .join("")}
        </div>`
    : ` 
        <div class="flex items-center gap-x-3 mb-2">
            <span class="text-xl font-bold text-purple-700">Question ${q}</span>
        </div>
        <p class="text-lg font-medium text-gray-800 mb-4">
            ${question}${question[question.length - 1] !== "?" ? "?" : ""}
        </p>
      <div class="open-ended-section flex flex-col gap-y-2">
          <label class="text-purple-700 font-medium" for="open-answer-${q}">
            Your Answer
          </label>
          <textarea
            type="text"
            name="open-answer-${q}"
            id="open-answer-${q}"
            maxlength="120"
            placeholder="..."
            class="input border border-purple-200 rounded px-3 py-1.5 focus:outline-0 leading-px"
          >${savedAnswer ? savedAnswer : ""}</textarea>
        </div>`;
};
