import ToggleMenu, {
  AddStrategy,
  RemoveStrategy,
  ToggleStrategy,
} from "../../components/Buttons/toggleMenu";
import "../../styles/main.css";
import QuestionsControl from "../../components/questions/QuestionsControl";
import CreateQuiz from "./modules/core/createQuiz";
import signUserOut from "../authentication/sign-out/signOut";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    console.error("Something Went Wrong! Please Sign In.");
    window.location.href = "../../pages/sign-in.html";
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

  // Add question
  QuestionsControl.addQuestion();

  // enable submit quiz
  CreateQuiz.submitQuiz();

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

  signUserOut();
});
