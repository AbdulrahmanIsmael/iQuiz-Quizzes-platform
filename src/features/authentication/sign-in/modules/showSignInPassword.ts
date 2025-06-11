import { SignInShowPassword } from "../../modules/showPassword";

export default function showSignInPassword(): void {
  const passwordInput = document.getElementById("password") as HTMLInputElement;
  const toggleCheckbox = document.getElementById(
    "showPassword"
  ) as HTMLInputElement;

  const signInInstance: SignInShowPassword = SignInShowPassword.getInstance(
    passwordInput,
    toggleCheckbox
  );

  signInInstance.init();
}
