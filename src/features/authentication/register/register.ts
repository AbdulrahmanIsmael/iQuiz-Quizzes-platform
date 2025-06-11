import validateUserData from "../modules/validateUserData";
import registerUser from "./modules/registerUser";
import showRegisterPassword from "./modules/showRegisterPassword";

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = <HTMLFormElement>(
    document.getElementById("register-form")
  );

  // toggle password visibility
  showRegisterPassword();

  // validate user data entered in the form
  validateUserData(registerForm);

  // register the user on form submission
  registerUser();
});
