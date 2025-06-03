import { I_strategy } from "../../types/validation_types";

export default class Input {
  private strategy: I_strategy;
  constructor(validationStrategy: I_strategy) {
    this.strategy = validationStrategy;
  }

  public setValidationStrategy(newValidationStrategy: I_strategy) {
    this.strategy = newValidationStrategy;
  }

  public validate(input: HTMLInputElement): boolean {
    return this.strategy.validate(input);
  }
}

// Username Strategy
export class UsernameStrategy implements I_strategy {
  public validate(username: HTMLInputElement): boolean {
    const usernameRegex = /^[^\d_][a-zA-Z\d_]{7,25}$/;
    return usernameRegex.test(username.value);
  }
}

// Email Strategy
export class EmailStrategy implements I_strategy {
  public validate(email: HTMLInputElement): boolean {
    const emailRegex =
      /^[a-zA-Z\d_.%-+]+@(gmail|yahoo|outlook|[a-zA-Z]+)\.(com|org|edu)$/i;
    return emailRegex.test(email.value);
  }
}

// Password Strategy
export class PasswordStrategy implements I_strategy {
  public validate(password: HTMLInputElement): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,30}$/;
    return passwordRegex.test(password.value);
  }
}
