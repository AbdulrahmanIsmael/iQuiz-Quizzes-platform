import toggleErrorMsg from "../../../modules/toggleErrorMsg";
import { I_validationCheck } from "../../../types/validation-types";
import CreateUserService from "./createUser";

export default function processRegistration(
  registerForm: HTMLFormElement,
  validationResults: I_validationCheck,
  errorMsg: HTMLParagraphElement
) {
  registerForm.addEventListener("submit", async (e: Event) => {
    e.preventDefault();
    if (
      validationResults.username &&
      validationResults.password &&
      validationResults.email &&
      validationResults.confirmPassword
    ) {
      toggleErrorMsg(errorMsg, false);
      try {
        await CreateUserService.createUser({
          username: validationResults.username,
          email: validationResults.email,
          password: validationResults.password,
        });
      } catch (error) {
        console.error("Error during registration: ", error);
        toggleErrorMsg(
          errorMsg,
          true,
          "Registration failed. Please try again."
        );
      }
    } else {
      toggleErrorMsg(errorMsg, true);
      console.error("User data is invalid. Please check the form.");
    }
  });
}
