import { RegisterShowPassword } from "../../modules/showPassword";

export default function showRegisterPassword(): void {
  const passwordInput = <HTMLInputElement>document.getElementById("password");
  const toggleCheckbox = <HTMLInputElement>(
    document.getElementById("showPassword")
  );
  const confirmPasswordInput = <HTMLInputElement>(
    document.getElementById("confirm-password")
  );

  if (!passwordInput || !toggleCheckbox || !confirmPasswordInput)
    console.error("Required inputs not found!");

  const registerInstance: RegisterShowPassword =
    RegisterShowPassword.getInstance(
      passwordInput,
      toggleCheckbox,
      confirmPasswordInput
    );

  registerInstance.init();
}
