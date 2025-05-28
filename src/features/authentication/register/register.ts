import ShowPassword from "../../../components/ShowPassword/showPassword";

// Immediately invoked function expression (IIFE) to initialize the register form password visibility toggle
(function showRegisterPassword(): void {
  const passwordInput = document.getElementById("password") as HTMLInputElement;
  const toggleCheckbox = document.getElementById(
    "showPassword"
  ) as HTMLInputElement;
  const confirmPasswordInput = document.getElementById(
    "confirm-password"
  ) as HTMLInputElement;

  const registerInstance: ShowPassword = ShowPassword.getInstance(
    passwordInput,
    toggleCheckbox,
    confirmPasswordInput
  );

  registerInstance.init();
})();
