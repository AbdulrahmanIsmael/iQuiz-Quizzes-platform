import { RegisterShowPassword } from "../../modules/showPassword";

export default function showRegisterPassword(): void {
  const passwordInput = document.getElementById("password") as HTMLInputElement;
  const toggleCheckbox = document.getElementById(
    "showPassword"
  ) as HTMLInputElement;
  const confirmPasswordInput = document.getElementById(
    "confirm-password"
  ) as HTMLInputElement;

  const registerInstance: RegisterShowPassword =
    RegisterShowPassword.getInstance(
      passwordInput,
      toggleCheckbox,
      confirmPasswordInput
    );

  registerInstance.init();
}
