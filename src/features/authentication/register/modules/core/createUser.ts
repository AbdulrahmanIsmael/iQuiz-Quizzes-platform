import {
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { I_userProfile } from "../../types/user";

export async function createUser(user: I_userProfile): Promise<void> {
  try {
    const userCredentials: UserCredential =
      await createUserWithEmailAndPassword(auth, user.email, user.password);
    await updateProfile(userCredentials.user, {
      displayName: user.username,
    });
  } catch (error) {
    console.error(error);
  }
}
