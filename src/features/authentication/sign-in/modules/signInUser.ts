import SignInUserService from "./core/processSignIn";

export default function signInUser(): void {
  const signInForm = <HTMLFormElement>document.getElementById("sign-in-form");
  const errorMsg = <HTMLParagraphElement>document.getElementById("error-msg");
  if (!signInForm || !errorMsg) {
    !signInForm && console.error("The sign-in form not found!");
    !errorMsg && console.error("The error message element not found!");
    return;
  }

  signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    SignInUserService.signIn(e.target as HTMLFormElement, errorMsg);
  });
}
