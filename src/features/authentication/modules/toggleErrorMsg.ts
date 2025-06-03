export default function toggleErrorMsg(
  errorMsg: HTMLElement,
  isError: boolean
): boolean {
  if (isError) {
    errorMsg.classList.contains("hidden") &&
      errorMsg.classList.remove("hidden");
    return false;
  } else {
    !errorMsg.classList.contains("hidden") && errorMsg.classList.add("hidden");
    return true;
  }
}
