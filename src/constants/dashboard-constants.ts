import { DocumentData } from "firebase/firestore";
import { T_activity, T_result } from "../types/dashboard-types";
import { FirestoreControl } from "../utils/firestoreControl";

export const getActivity = async (activity: T_activity) => {
  const quizOperation = new FirestoreControl("quizzes", activity.quiz.id);
  const quiz: DocumentData | null = await quizOperation.getDocument();
  const quizDate = (quiz as DocumentData)?.createdAt
    .toDate()
    .toLocaleDateString();
  const quizTime = (quiz as DocumentData)?.createdAt
    .toDate()
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return `
            <div class="w-full flex gap-x-3 items-start pb-3">
              <img
                src="/assets/${activity.type
                  .toLowerCase()
                  .slice(0, activity.type.length - 1)}.png"
                alt="${activity.type} Quiz icon"
                class="w-7 h-7"
                id="user-update-icon"
              />
              <div class="flex flex-col">
                <p class="text-sm font-semibold flex overflow-hidden">
                  <span id="user-update-status" class="text-purple-800"
                    >${activity.type[0].toUpperCase()}${activity.type.slice(
    1
  )}</span
                  >&colon;&MediumSpace;
                  <span id="user-update-description" class="break-all"
                    >${(quiz as DocumentData).title}</span
                  >
                </p>
                <small class="text-gray-500" id="user-update-date"
                >${quizDate} ${quizTime}</small
                >
              </div>
            </div>
      `;
};

export const getResult = (quiz: DocumentData, result: T_result) => {
  return `
            <article
            class="card !p-0 bg-white/90 border-2 border-purple-100 shadow-md rounded-xl hover:shadow-xl transition-natural"
          >
            <div class="flex flex-col gap-y-2 p-6">
              <div class="flex items-center justify-between mb-2">
                <div class="flex-1">
                  <div class="flex items-center gap-x-4">
                    <h3 class="text-purple-800 text-xl font-bold">
                      ${quiz.title}
                    </h3>
                    <div class="text-2xl font-bold text-purple-600">${Math.round(
                      result.percent
                    )}%</div>
                  </div>
                  <small class="text-sm text-purple-500"
                    >${quiz.owner.id}</small
                  >
                </div>
              </div>
              <div class="flex items-center gap-2 mb-3">
                <div class="flex-1 h-2 bg-purple-100 rounded-full">
                  <div 
                    class="h-full bg-purple-600 rounded-full"
                    style="width: ${result.percent}%"
                  ></div>
                </div>
              </div>
              <div class="flex justify-between text-sm text-gray-600">
                <span>Completed:  ${quiz.createdAt
                  .toDate()
                  .toLocaleDateString()}</span>

                <span>${result.score}/${result.fullScore} correct</span>
              </div>
            </div>
          </article>
  `;
};
