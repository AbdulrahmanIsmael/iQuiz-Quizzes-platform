import { RegisterShowPassword } from "../modules/showPassword";
import Validation from "./modules/validate";
import {
  EmailStrategy,
  PasswordStrategy,
  UsernameStrategy,
} from "./modules/validationStrategies";

// initialize the register form password visibility toggle
(function showRegisterPassword(): void {
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
})();

// validate the register form inputs
(function validateRegisterForm(): void {
  const registerForm = document.getElementById(
    "register-form"
  ) as HTMLFormElement;

  Validation.validate(
    registerForm.username,
    new UsernameStrategy(),
    "error-username-msg"
  );

  Validation.validate(
    registerForm.email,
    new EmailStrategy(),
    "error-email-msg"
  );

  Validation.validate(
    registerForm.password,
    new PasswordStrategy(),
    "error-password-msg"
  );

  Validation.validaateConfirmPassword(
    registerForm.password,
    registerForm.confirmPassword
  );
})();
