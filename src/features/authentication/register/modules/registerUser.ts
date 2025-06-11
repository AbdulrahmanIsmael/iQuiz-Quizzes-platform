import Validation from "../../modules/core/validate";
import processRegistration from "./core/processRegistration";

// validate the register form inputs
export default function registerUser(): void {
  const registerForm = <HTMLFormElement>(
    document.getElementById("register-form")
  );
  const errorMsg = <HTMLParagraphElement>document.getElementById("error-msg");

  if (!registerForm || !errorMsg) {
    !registerForm && console.error("Register Form not found!");
    !errorMsg && console.error("Error message element not found!");
    return;
  }

  processRegistration(registerForm, Validation.validationCheck, errorMsg);
}
