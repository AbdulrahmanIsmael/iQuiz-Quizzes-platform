import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import redirectToPage from "../modules/redirect";

export default function signUserOut() {
  const signOutBtn = <HTMLButtonElement>document.getElementById("signOut");
  signOutBtn.addEventListener("click", async (e: Event) => {
    e.preventDefault();
    try {
      await signOut(auth);
      console.log("successful sign out, we will be waiting for you again!");
    } catch (error) {
      console.error("Error during signing out: ", error);
    }
    redirectToPage("../../pages/sign-in.html");
  });
}
