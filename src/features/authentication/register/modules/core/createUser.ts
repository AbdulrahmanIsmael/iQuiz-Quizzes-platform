import {
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { auth } from "../../../firebase";
import redirectToPage from "../../../modules/redirect";
import loadingStatus from "../../../modules/showLoading";
import toggleErrorMsg from "../../../modules/toggleErrorMsg";
import { I_userProfile } from "../../../types/user-types";

export async function createUser(user: I_userProfile): Promise<void> {
  try {
    // show loading until the registration finish
    loadingStatus(
      true,
      <HTMLDivElement>document.getElementById("register-form-container")
    );
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    await updateProfile(userCredential.user, {
      displayName: user.username,
    });
    // if successful, redirect the user to his/her dashboard
    if (userCredential) {
      redirectToPage("../../../../../pages/dashboard.html");
    }
  } catch (error: any) {
    loadingStatus(
      false,
      <HTMLDivElement>document.getElementById("register-form-container")
    );
    const errorMsg = <HTMLParagraphElement>document.getElementById("error-msg");
    if (error.code === "auth/email-already-in-use") {
      toggleErrorMsg(errorMsg, true, "Email already in use!");
    }
    if (error.code === "auth/user-not-fould") {
      toggleErrorMsg(errorMsg, true, "User not found, please try again later!");
    }
    console.log(error.message);
  }
}
