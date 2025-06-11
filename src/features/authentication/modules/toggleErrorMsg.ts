export default function toggleErrorMsg(
  errorMsg: HTMLElement,
  isError: boolean,
  error?: string
): boolean {
  if (isError) {
    errorMsg.classList.contains("hidden") &&
      errorMsg.classList.remove("hidden");
    if (errorMsg.firstElementChild && error) {
      errorMsg.firstElementChild.textContent = error;
    }
    return false;
  } else {
    !errorMsg.classList.contains("hidden") && errorMsg.classList.add("hidden");
    return true;
  }
}
