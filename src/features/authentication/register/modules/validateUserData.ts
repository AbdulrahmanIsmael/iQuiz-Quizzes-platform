import Validation from "./core/validate";
import {
  EmailStrategy,
  PasswordStrategy,
  UsernameStrategy,
} from "./core/validationStrategies";

export default function validateUserData() {
  const registerForm = <HTMLFormElement>(
    document.getElementById("register-form")
  );

  !registerForm && console.error("Register Form not found!");

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

  Validation.validateConfirmPassword(
    registerForm.password,
    registerForm.confirmPassword
  );
}
