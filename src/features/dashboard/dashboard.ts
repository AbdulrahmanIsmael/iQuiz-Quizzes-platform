import { onAuthStateChanged } from "firebase/auth";
import ToggleMenu, {
  AddStrategy,
  RemoveStrategy,
  ToggleStrategy,
} from "../../components/Buttons/toggleMenu";
import "../../styles/main.css";
import { setElementContent } from "../../utils/setElementContent";
import { auth } from "../authentication/firebase";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    location.href = "../../pages/sign-in.html";
  } else {
    const userElement = <HTMLSpanElement>document.getElementById("user-name");
    const usernameElement = <HTMLSpanElement>(
      document.getElementById("username")
    );
    const emailElement = <HTMLSpanElement>document.getElementById("user-email");
    const userMenuBtnImg = <HTMLImageElement>(
      document.querySelector("#user-menu-btn > img")
    );
    const profilePhotoElement = <HTMLImageElement>(
      document.getElementById("user-photo")
    );

    setElementContent(userElement, user.displayName || "User");
    setElementContent(usernameElement, user.displayName || "User");
    setElementContent(emailElement, user.email || "No email");
    if (user.photoURL && typeof user.photoURL === "string") {
      profilePhotoElement.src = user.photoURL;
      userMenuBtnImg.src = user.photoURL;
    }
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
});
