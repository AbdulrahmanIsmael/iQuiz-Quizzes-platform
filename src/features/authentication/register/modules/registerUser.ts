import toggleErrorMsg from "../../modules/toggleErrorMsg";
import { I_validationCheck } from "../types/validation_types";
import { createUser } from "./core/createUser";
import Validation from "./core/validate";
import {
  EmailStrategy,
  PasswordStrategy,
  UsernameStrategy,
} from "./core/validationStrategies";

// validate the register form inputs
export default function registerUser(): void {
  const registerForm = document.getElementById(
    "register-form"
  ) as HTMLFormElement;
  const errorMsg = document.getElementById("error-msg") as HTMLParagraphElement;

  Validation.validate(
    registerForm.username,
    new UsernameStrategy(),
    "error-username-msg"
  );

  Validation.validate(
    registerForm.email,
    new EmailStrategy(),
    "error-email-msg"
  );

  Validation.validate(
    registerForm.password,
    new PasswordStrategy(),
    "error-password-msg"
  );

  Validation.validateConfirmPassword(
    registerForm.password,
    registerForm.confirmPassword
  );

  sendUserData(registerForm, Validation.validationCheck, errorMsg);
}

// register the user with the form inputs and validation results
function sendUserData(
  registerForm: HTMLFormElement,
  validationResults: I_validationCheck,
  errorMsg: HTMLParagraphElement
) {
  registerForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    if (
      validationResults.username &&
      validationResults.password &&
      validationResults.email &&
      validationResults.confirmPassword
    ) {
      toggleErrorMsg(errorMsg, false);
      createUser({
        username: validationResults.username,
        email: validationResults.email,
        password: validationResults.password,
      });
      //! showing success message and redirecting to the main page of the user
      console.log("User data is valid. Proceeding with registration...");
    } else {
      toggleErrorMsg(errorMsg, true);
      console.error("User data is invalid. Please check the form.");
    }
  });
}
