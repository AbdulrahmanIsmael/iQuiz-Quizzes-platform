import toggleErrorMsg from "../../../modules/toggleErrorMsg";
import { I_strategy, I_validationCheck } from "../../types/validation_types";
import Input, {
  PasswordStrategy,
  UsernameStrategy,
} from "./validationStrategies";
export default class Validation {
  private static input: Input = new Input(new UsernameStrategy());
  public static validationCheck: I_validationCheck = {
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  };

  private constructor() {}

  public static validate(
    input: HTMLInputElement,
    strategy: I_strategy,
    errorMsgId: string
  ): void {
    input.addEventListener("blur", (e: Event) => {
      const input = e.target as HTMLInputElement;
      const errorMsg = document.getElementById(
        errorMsgId
      ) as HTMLParagraphElement;

      // Set the validation strategy if it's not already set
      !(this.input instanceof UsernameStrategy) &&
        this.input.setValidationStrategy(strategy);

      // Validate the input using the current strategy
      const isValid: boolean = this.input.validate(input);
      toggleErrorMsg(errorMsg, !isValid);
      // Update the validation check object
      this.validationCheck[input.name as "username" | "email" | "password"] =
        isValid ? (input.value as string) : false;
    });
  }

  public static validateConfirmPassword(
    passwordInput: HTMLInputElement,
    confirmPasswordInput: HTMLInputElement
  ): void {
    const errorMsg = document.getElementById(
      "error-confirmation-msg"
    ) as HTMLParagraphElement;

    confirmPasswordInput.addEventListener("blur", (e: Event) => {
      // Ensure the password is validated before checking confirmation
      if (!new PasswordStrategy().validate(passwordInput)) {
        errorMsg.firstElementChild!.textContent =
          "Please enter a valid password.";
        toggleErrorMsg(errorMsg, true);
        this.validationCheck.confirmPassword = false;
        return;
      }

      // Validate the confirmation password
      const isValid: boolean =
        passwordInput.value === (e.target as HTMLInputElement).value;
      toggleErrorMsg(errorMsg, !isValid);
      // Update the validation check object
      this.validationCheck.confirmPassword = isValid;
    });
  }
}
