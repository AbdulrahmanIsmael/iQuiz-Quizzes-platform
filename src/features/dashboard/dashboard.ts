import { onAuthStateChanged, signOut } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import ToggleMenu, {
  AddStrategy,
  RemoveStrategy,
  ToggleStrategy,
} from "../../components/Buttons/toggleMenu";
import "../../styles/main.css";
import { setElementContent } from "../../utils/setElementContent";
import { auth } from "../firebase";
import redirectToPage from "../authentication/modules/redirect";
import signUserOut from "../authentication/sign-out/signOut";
import { FirestoreControl } from "../../utils/firestoreControl";

onAuthStateChanged(auth, async (user) => {
  try {
    if (!user) {
      location.href = "../../pages/sign-in.html";
    } else {
      const userElement = <HTMLSpanElement>document.getElementById("user-name");
      const usernameElement = <HTMLSpanElement>(
        document.getElementById("username")
      );
      const emailElement = <HTMLSpanElement>(
        document.getElementById("user-email")
      );
      const userMenuBtnImg = <HTMLImageElement>(
        document.querySelector("#user-menu-btn > img")
      );
      const profilePhotoElement = <HTMLImageElement>(
        document.getElementById("user-photo")
      );
      const solvedQuizzes = <HTMLDivElement>document.getElementById("solved");
      const userSolved = <HTMLDivElement>document.getElementById("user-solved");
      const createdQuizzes = <HTMLDivElement>document.getElementById("created");
      const userCreated = <HTMLDivElement>(
        document.getElementById("user-created")
      );

      const userDataOperation = new FirestoreControl(
        "users",
        user.displayName as string
      );
      const userData: DocumentData | null =
        await userDataOperation.getDocument();

      if (userData) {
        setElementContent(
          solvedQuizzes,
          userData?.numberOfSolvedQuizzes.toString()
        );
        setElementContent(
          userSolved,
          userData?.numberOfSolvedQuizzes.toString()
        );
        setElementContent(
          createdQuizzes,
          userData?.numberOfCreatedQuizzes.toString()
        );
        setElementContent(
          userCreated,
          userData?.numberOfCreatedQuizzes.toString()
        );
      } else {
        setElementContent(solvedQuizzes, "N/A");
        setElementContent(userSolved, "N/A");
        setElementContent(createdQuizzes, "N/A");
        setElementContent(userCreated, "N/A");
      }

      setElementContent(userElement, user.displayName || "User");
      setElementContent(usernameElement, user.displayName || "User");
      setElementContent(emailElement, user.email || "No email");
      if (user.photoURL && typeof user.photoURL === "string") {
        profilePhotoElement.src = user.photoURL;
        userMenuBtnImg.src = user.photoURL;
      }
    }
  } catch (error) {
    console.error("Something went wrong");
    await signOut(auth);
    redirectToPage("../../pages/sign-in.html");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const userMenuBtn = <HTMLButtonElement>(
    document.getElementById("user-menu-btn")
  );
  const userMenuElement = <HTMLElement>document.getElementById("user-menu");
  const notificationsBtn = <HTMLButtonElement>(
    document.getElementById("notifications-btn")
  );
  const notificationsMenu = <HTMLDivElement>(
    document.getElementById("notifications-menu")
  );
  const notificationsCollapseBtn = <HTMLButtonElement>(
    document.getElementById("notifications-collapse")
  );

  const userMenuToggle = new ToggleMenu(
    new ToggleStrategy(),
    userMenuBtn,
    userMenuElement,
    "closed"
  );
  userMenuToggle.setMenu();

  const notificationMenuToggle = new ToggleMenu(
    new RemoveStrategy(),
    notificationsBtn,
    notificationsMenu,
    "collapsed"
  );
  notificationMenuToggle.setMenu();

  const notificationMenuToggleCollapse = new ToggleMenu(
    new AddStrategy(),
    notificationsCollapseBtn,
    notificationsMenu,
    "collapsed"
  );
  notificationMenuToggleCollapse.setMenu();

  signUserOut();
});
