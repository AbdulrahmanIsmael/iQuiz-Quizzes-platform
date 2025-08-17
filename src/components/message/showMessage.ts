export function showMsg(msg: HTMLElement, URL: string) {
  // Show success message
  if (msg) {
    msg.classList.remove("hidden");

    setTimeout(() => {
      window.location.href = URL;
    }, 3000);
  }
}
