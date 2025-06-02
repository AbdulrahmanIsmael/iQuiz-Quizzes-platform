import { I_strategy } from "../types/validation_types";
import Input, { UsernameStrategy } from "./validationStrategies";

export default class Validation {
  private static input: Input = new Input(new UsernameStrategy());

  private constructor() {}

  public static validate(
    input: HTMLInputElement,
    strategy: I_strategy,
    errorMsgId: string
  ): void {
    input.addEventListener("blur", (e: Event) => {
      const input = e.target as HTMLInputElement;
      const errorMsg = document.getElementById(errorMsgId) as HTMLDivElement;
      // Set the validation strategy if it's not a UsernameStrategy
      !(this.input instanceof UsernameStrategy) &&
        this.input.setValidationStrategy(strategy);
      const isValid: boolean = this.input.validate(input);
      // Toggle error message visibility based on validation result
      if (!isValid) {
        errorMsg.classList.contains("hidden") &&
          errorMsg.classList.remove("hidden");
      } else {
        !errorMsg.classList.contains("hidden") &&
          errorMsg.classList.add("hidden");
      }
    });
  }

  public static validaateConfirmPassword(
    passwordInput: HTMLInputElement,
    confirmPasswordInput: HTMLInputElement
  ): void {
    const errorMsg = document.getElementById(
      "error-confirmation-msg"
    ) as HTMLDivElement;
    // Check if the confirm password input does not match the password input
    if (passwordInput.value !== confirmPasswordInput.value) {
      errorMsg.classList.contains("hidden") &&
        errorMsg.classList.remove("hidden");
    } else {
      !errorMsg.classList.contains("hidden") &&
        errorMsg.classList.add("hidden");
    }
  }
}
