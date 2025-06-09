import processRegistration from "./core/processRegistration";
import Validation from "./core/validate";

// validate the register form inputs
export default function registerUser(): void {
  const registerForm = <HTMLFormElement>(
    document.getElementById("register-form")
  );
  const errorMsg = <HTMLParagraphElement>document.getElementById("error-msg");

  !registerForm && console.error("Register Form not found!");
  !errorMsg && console.error("Error message element not found!");

  processRegistration(registerForm, Validation.validationCheck, errorMsg);
}
