import {
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { auth } from "../../../firebase";
import toggleErrorMsg from "../../../modules/toggleErrorMsg";
import { I_userProfile } from "../../../types/user-types";

export async function createUser(user: I_userProfile): Promise<void> {
  try {
    const userCredentials: UserCredential =
      await createUserWithEmailAndPassword(auth, user.email, user.password);
    await updateProfile(userCredentials.user, {
      displayName: user.username,
    });
  } catch (error: any) {
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
