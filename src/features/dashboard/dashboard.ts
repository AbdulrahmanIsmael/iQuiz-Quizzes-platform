import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  getDoc,
  DocumentSnapshot,
} from "firebase/firestore";
import ToggleMenu, {
  AddStrategy,
  RemoveStrategy,
  ToggleStrategy,
} from "../../components/Buttons/toggleMenu";
import "../../styles/main.css";
import { setElementContent } from "../../utils/setElementContent";
import { auth, db } from "../firebase";
import redirectToPage from "../authentication/modules/redirect";
import signUserOut from "../authentication/sign-out/signOut";

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

      const usersCollection: CollectionReference = collection(db, "users");
      const userDoc: DocumentReference = doc(
        usersCollection,
        user.displayName as string
      );
      const dataSnapshot: DocumentSnapshot = await getDoc(userDoc);

      if (dataSnapshot.exists()) {
        const data = dataSnapshot.data();
        setElementContent(
          solvedQuizzes,
          data?.numberOfSolvedQuizzes.toString()
        );
        setElementContent(userSolved, data?.numberOfSolvedQuizzes.toString());
        setElementContent(
          createdQuizzes,
          data?.numberOfCreatedQuizzes.toString()
        );
        setElementContent(userCreated, data?.numberOfCreatedQuizzes.toString());
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
