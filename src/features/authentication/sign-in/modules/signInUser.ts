import processSignIn from "./core/processSignIn";

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
    processSignIn(e.target as HTMLFormElement, errorMsg);
    // Show loading before redirect the user to the dashboard
    /*
    showLoadingAndRemoveForm(
      <HTMLDivElement>document.getElementById("signIn-form-container")
    );
    redirectToPage("../../../../pages/dashboard.html", 4000);
    */
  });
}
