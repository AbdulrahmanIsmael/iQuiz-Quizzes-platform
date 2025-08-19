export function enableQuestionsNav() {
  const btns = document.querySelectorAll(".q-btn");
  btns.forEach((btn) => {
    btn.addEventListener("click", (e: Event) => {
      const toQuestionNumber = (e.target as HTMLElement).textContent;
      const qParam = new URLSearchParams();
      qParam.set("q", toQuestionNumber as string);
      const queryString = qParam.toString();
      localStorage.setItem("scrollYPosition", JSON.stringify(window.scrollY));
      window.location.replace(`../../../pages/solve.html?${queryString}`);
    });
  });
}
