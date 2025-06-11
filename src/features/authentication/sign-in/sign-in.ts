import validateUserData from "../modules/validateUserData";
import showSignInPassword from "./modules/showSignInPassword";
import signInUser from "./modules/signInUser";
document.addEventListener("DOMContentLoaded", () => {
  const signInForm = <HTMLFormElement>document.getElementById("sign-in-form");

  // Toggle password visibility
  showSignInPassword();

  // validate user data entered in the form
  validateUserData(signInForm);

  // Sign in form submission
  signInUser();
});
