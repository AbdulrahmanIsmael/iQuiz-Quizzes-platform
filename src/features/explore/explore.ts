import "../../styles/main.css";
import ToggleMenu, {
  AddStrategy,
  RemoveStrategy,
  ToggleStrategy,
} from "../../components/Buttons/toggleMenu";
import signUserOut from "../authentication/sign-out/signOut";
import { auth } from "../firebase";
import { showMsg } from "../../components/message/showMessage";
import { GetQuizzes } from "./modules/core/getQuizzes";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { insertQuizzes } from "./modules/insertQuizzes";
import { enableStartQuizEvent } from "./modules/startQuiz";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    console.error("Something Went Wrong! Please Sign In.");
    window.location.href = "../../pages/sign-in.html";
  }
});

document.addEventListener("DOMContentLoaded", async () => {
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

  localStorage.clear();

  // toggle user menu
  const userMenuToggle = new ToggleMenu(
    new ToggleStrategy(),
    userMenuBtn,
    userMenuElement,
    "closed"
  );
  userMenuToggle.setMenu();

  // show the notifications menu
  const notificationMenuToggle = new ToggleMenu(
    new RemoveStrategy(),
    notificationsBtn,
    notificationsMenu,
    "collapsed"
  );
  notificationMenuToggle.setMenu();

  // collapse the notifications menu
  const notificationsMenuCollapse = new ToggleMenu(
    new AddStrategy(),
    notificationsCollapseBtn,
    notificationsMenu,
    "collapsed"
  );
  notificationsMenuCollapse.setMenu();

  try {
    const userQuizzes = await GetQuizzes.getUserQuizzes();
    const recentQuizzes = await GetQuizzes.getRecentQuizzes();
    const userQuizzesLoading = document.getElementById(
      "user-quizzes-container-loading"
    );
    const userQuizzesContainer = document.querySelector(
      "#user-quizzes-container-content .cards"
    );
    const recentQuizzesLoading = document.getElementById(
      "recent-quizzes-container-loading"
    );
    const recentQuizzesContainer = document.querySelector(
      "#recent-quizzes-container-content .cards"
    );

    if (recentQuizzesContainer && recentQuizzesLoading) {
      await insertQuizzes(
        recentQuizzesContainer as HTMLElement,
        recentQuizzesLoading as HTMLElement,
        recentQuizzes
      );
    }

    if (userQuizzesContainer && userQuizzesLoading) {
      await insertQuizzes(
        userQuizzesContainer as HTMLElement,
        userQuizzesLoading as HTMLElement,
        userQuizzes
      );
    }
    enableStartQuizEvent();
  } catch (error) {
    console.error("Unexpected Error:", error);
    await signOut(auth);
    const errorMsg = document.getElementById("error-message");
    showMsg(errorMsg as HTMLDivElement, "../../pages/sign-in.html");
  }

  signUserOut();
});
