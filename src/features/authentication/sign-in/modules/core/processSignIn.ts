import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "../../../firebase";
import redirectToPage from "../../../modules/redirect";
import loadingStatus from "../../../modules/showLoading";
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
    loadingStatus(
      true,
      <HTMLDivElement>document.getElementById("signIn-form-container")
    );
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (userCredential) redirectToPage("../../../../../pages/dashboard.html");
  } catch (error: any) {
    loadingStatus(
      false,
      <HTMLDivElement>document.getElementById("signIn-form-container")
    );
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
