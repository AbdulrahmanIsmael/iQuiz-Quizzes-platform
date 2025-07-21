export function getQuestionCard(counter: number) {
  return `
  <div
  class="question-card relative border-2 border-purple-100 rounded-xl p-6 bg-white/80 shadow-md flexbox-column gap-y-4"
  >
  <button class="remove-card absolute -top-3 -right-3" onclick="this.closest('.question-card').remove();">
                <img
                src="../assets/close.png"
                  alt="remove quiz icon"
                  class="remove-card-image w-8 h-8 cursor-pointer"
                />
              </button>
              <div class="flex items-center gap-x-3">
                <span class="text-xl font-bold text-purple-700"
                  >Question <span class="question-number">${counter}</span></span
                >
                <select
                  class="question-type ml-auto border border-purple-300 rounded px-2 py-1 text-sm text-purple-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition"
                  name="question-type"
                  onchange="const card=this.closest('.question-card');if(this.value==='multiple'){card.querySelector('.choices-section').classList.remove('hidden');card.querySelector('.open-ended-section').classList.add('hidden');}else{card.querySelector('.choices-section').classList.add('hidden');card.querySelector('.open-ended-section').classList.remove('hidden');}"
                >
                  <option value="multiple">Multiple Choice</option>
                  <option value="open">Open-ended</option>
                </select>
              </div>
              <input
                type="text"
                name="question-text-${counter}"
                id="question-text-${counter}"
                required
                maxlength="120"
                placeholder="Enter your question"
                class="input border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <!-- Multiple Choice Answer -->
              <div class="choices-section flexbox-column gap-y-2">
                <div class="flex items-center gap-x-2">
                  <input
                    type="radio"
                    name="correct-1"
                    id="correct-1-1"
                    value="1"
                    required
                    class="accent-purple-600"
                  />
                  <input
                    type="text"
                    name="choice-1-1"
                    id="choice-1-1"
                    maxlength="60"
                    placeholder="Choice 1"
                    class="w-full input border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required
                  />
                </div>
                <div class="flex items-center gap-x-2">
                  <input
                    type="radio"
                    name="correct-1"
                    id="correct-1-2"
                    value="2"
                    class="accent-purple-600"
                  />
                  <input
                    type="text"
                    name="choice-1-2"
                    id="choice-1-2"
                    maxlength="60"
                    placeholder="Choice 2"
                    class="w-full input border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required
                  />
                </div>
                <div class="flex items-center gap-x-2">
                  <input
                    type="radio"
                    name="correct-1"
                    id="correct-1-3"
                    value="3"
                    class="accent-purple-600"
                  />
                  <input
                    type="text"
                    name="choice-1-3"
                    id="choice-1-3"
                    maxlength="60"
                    placeholder="Choice 3"
                    class="w-full input border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div class="flex items-center gap-x-2">
                  <input
                    type="radio"
                    name="correct-1"
                    id="correct-1-4"
                    value="4"
                    class="accent-purple-600"
                  />
                  <input
                    type="text"
                    name="choice-1-4"
                    id="choice-1-4"
                    maxlength="60"
                    placeholder="Choice 4"
                    class="w-full input border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>
              <!-- Open-ended Answer -->
              <div class="open-ended-section flexbox-column gap-y-2 hidden">
                <label class="text-purple-700 font-medium" for="open-answer-1">
                  Sample Answer (optional)
                </label>
                <input
                  type="text"
                  name="open-answer-${counter}"
                  id="open-answer-${counter}"
                  maxlength="120"
                  placeholder="Sample answer for reference"
                  class="input border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>
`;
}
