//* Register Show Password Module
export class RegisterShowPassword {
  private static instance: RegisterShowPassword;
  // bound handler to maintain the context of `this` in event listeners
  private boundHandler: () => void;

  private constructor(
    private passwordInput: HTMLInputElement,
    private showPasswordCheckbox: HTMLInputElement,
    private confirmPasswordInput: HTMLInputElement
  ) {
    this.boundHandler = this.showPasswordHandler.bind(this);
  }

  // Factory method to get the singleton instance
  public static getInstance(
    passwordInput: HTMLInputElement,
    showPasswordCheckbox: HTMLInputElement,
    confirmPasswordInput: HTMLInputElement
  ): RegisterShowPassword {
    if (!this.instance) {
      this.instance = new RegisterShowPassword(
        passwordInput,
        showPasswordCheckbox,
        confirmPasswordInput
      );
    }
    return this.instance;
  }

  private showPasswordHandler(): void {
    const isChecked = this.showPasswordCheckbox.checked;
    this.passwordInput.type = isChecked ? "text" : "password";
    if (this.confirmPasswordInput) {
      this.confirmPasswordInput.type = isChecked ? "text" : "password";
    }
  }

  public init(): void {
    this.showPasswordCheckbox.addEventListener("change", this.boundHandler);
  }
}

//* Sign In Show Password Module
export class SignInShowPassword {
  private static instance: SignInShowPassword;
  // bound handler to maintain the context of `this` in event listeners
  private boundHandler: () => void;

  private constructor(
    private passwordInput: HTMLInputElement,
    private showPasswordCheckbox: HTMLInputElement
  ) {
    this.boundHandler = this.showPasswordHandler.bind(this);
  }

  // Factory method to get the singleton instance
  public static getInstance(
    passwordInput: HTMLInputElement,
    showPasswordCheckbox: HTMLInputElement
  ): SignInShowPassword {
    if (!this.instance) {
      this.instance = new SignInShowPassword(
        passwordInput,
        showPasswordCheckbox
      );
    }

    return this.instance;
  }

  private showPasswordHandler(): void {
    const isChecked = this.showPasswordCheckbox.checked;
    this.passwordInput.type = isChecked ? "text" : "password";
  }

  public init(): void {
    this.showPasswordCheckbox.addEventListener("change", this.boundHandler);
  }
}
