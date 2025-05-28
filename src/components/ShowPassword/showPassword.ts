export default class ShowPassword {
  // Singleton instances for registration and sign-in forms
  private static registerInstance: ShowPassword;
  private static signInInstance: ShowPassword;
  // bound handler to maintain the context of `this` in event listeners
  private boundHandler: () => void;

  private constructor(
    private passwordInput: HTMLInputElement,
    private showPasswordCheckbox: HTMLInputElement,
    private confirmPasswordInput?: HTMLInputElement
  ) {
    this.boundHandler = this.showPasswordHandler.bind(this);
  }

  // Factory method to get the singleton instance
  public static getInstance(
    passwordInput: HTMLInputElement,
    showPasswordCheckbox: HTMLInputElement,
    confirmPasswordInput?: HTMLInputElement
  ): ShowPassword {
    // if confirmPasswordInput exists, treat as register form
    if (confirmPasswordInput) {
      if (!this.registerInstance) {
        this.registerInstance = new ShowPassword(
          passwordInput,
          showPasswordCheckbox,
          confirmPasswordInput
        );
      }
      return this.registerInstance;
    }

    // if confirmPasswordInput doesn't exist, treat as sign-in form
    if (!this.signInInstance) {
      this.signInInstance = new ShowPassword(
        passwordInput,
        showPasswordCheckbox
      );
    }
    return this.signInInstance;
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

  public destroy(): void {
    this.showPasswordCheckbox.removeEventListener("change", this.boundHandler);
  }
}
