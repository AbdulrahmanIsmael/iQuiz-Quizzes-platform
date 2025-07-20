import ToggleMenu, {
  AddStrategy,
  RemoveStrategy,
  ToggleStrategy,
} from "../../components/Buttons/toggleMenu";
import "../../styles/main.css";
//import ToggleQuestions from "../../components/questions/toggleQuestion";
//import RemoveQuestion from "../../components/questions/removeQuestion";
import AddQuestion from "../../components/questions/addQuestion";

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
  AddQuestion.addQuestion();

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
});
