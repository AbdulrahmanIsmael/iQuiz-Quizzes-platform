import ToggleMenu, {
  AddStrategy,
  RemoveStrategy,
  ToggleStrategy,
} from "../../components/Buttons/toggleMenu";
import "../../styles/main.css";
import signUserOut from "../authentication/sign-out/signOut";
import { insertPagination } from "./modules/addPagination";
import { setQuestion } from "./modules/setQuestion";
import { enableQuestionsNav } from "./modules/enableQuestionsNav";
import { saveAnswers } from "./modules/saveAnswers";
import { getScrollY } from "./modules/getScrollY";
import { submitQuiz } from "./modules/core/submitQuiz";

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

  getScrollY();

  // add pagination buttons
  insertPagination();

  // add question
  setQuestion();

  // add questions navigation event
  enableQuestionsNav();

  // save answers
  saveAnswers();

  // submit quiz to DB
  submitQuiz();
});
