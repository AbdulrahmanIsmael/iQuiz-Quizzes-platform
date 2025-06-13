import toggleErrorMsg from "../../../modules/toggleErrorMsg";
import { I_validationCheck } from "../../../types/validation-types";
import CreateUserService from "./createUser";

export default function processRegistration(
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
      CreateUserService.createUser({
        username: validationResults.username,
        email: validationResults.email,
        password: validationResults.password,
      });
    } else {
      toggleErrorMsg(errorMsg, true);
      console.error("User data is invalid. Please check the form.");
    }
  });
}
