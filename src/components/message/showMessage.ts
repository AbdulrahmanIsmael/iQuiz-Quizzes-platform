export function showMsg(
  msg: HTMLElement,
  URL: string | null,
  content?: string
) {
  // Show success message
  if (msg) {
    if (content)
      (
        msg.firstElementChild?.lastElementChild as HTMLParagraphElement
      ).textContent = content;
    msg.classList.remove("hidden");
    setTimeout(() => {
      if (URL) {
        window.location.href = URL;
      } else {
        msg.classList.add("hidden");
      }
    }, 3000);
  }
}
