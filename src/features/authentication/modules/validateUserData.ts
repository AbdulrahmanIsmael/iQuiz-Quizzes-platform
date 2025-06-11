import Validation from "./core/validate";
import {
  EmailStrategy,
  PasswordStrategy,
  UsernameStrategy,
} from "./core/validationStrategies";

export default function validateUserData(form: HTMLFormElement) {
  !form && console.error("The form not found!");

  if (form.username)
    Validation.validate(
      form.username,
      new UsernameStrategy(),
      "error-username-msg"
    );

  Validation.validate(form.email, new EmailStrategy(), "error-email-msg");

  Validation.validate(
    form.password,
    new PasswordStrategy(),
    "error-password-msg"
  );

  if (form.confirmPassword)
    Validation.validateConfirmPassword(form.password, form.confirmPassword);
}
