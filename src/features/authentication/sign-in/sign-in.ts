import { SignInShowPassword } from "../modules/showPassword";

// Immediately invoked function expression (IIFE) to initialize the sign in form password visibility toggle
(function showSignInPassword(): void {
  const passwordInput = document.getElementById("password") as HTMLInputElement;
  const toggleCheckbox = document.getElementById(
    "showPassword"
  ) as HTMLInputElement;

  const signInInstance: SignInShowPassword = SignInShowPassword.getInstance(
    passwordInput,
    toggleCheckbox
  );

  signInInstance.init();
})();
