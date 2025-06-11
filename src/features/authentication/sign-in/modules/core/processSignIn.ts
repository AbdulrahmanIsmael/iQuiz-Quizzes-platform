import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import toggleErrorMsg from "../../../modules/toggleErrorMsg";

export default async function processSignIn(
  form: HTMLFormElement,
  errorMsg: HTMLParagraphElement
): Promise<void> {
  const email = form.email.value.trim();
  const password = form.password.value.trim();

  if (!email || !password) {
    toggleErrorMsg(errorMsg, true, "Email and Password are required!");
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    //! Redirect to the profile page after successful sign-in
  } catch (error: any) {
    if (
      error.code === "auth/user-not-found" ||
      error.code === "auth/invalid-credential"
    ) {
      toggleErrorMsg(
        errorMsg,
        true,
        "Please make sure to enter the correct email and password!"
      );
    }

    if (error.code === "auth/wrong-password") {
      toggleErrorMsg(errorMsg, true, "The password you entered is incorrect!");
    }

    if (error.code === "auth/invalid-email") {
      toggleErrorMsg(errorMsg, true, "The email you entered is incorrect!");
    }
  }
}
