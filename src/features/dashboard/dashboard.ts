import ToggleMenu, {
  AddStrategy,
  RemoveStrategy,
  ToggleStrategy,
} from "../../components/Buttons/toggleMenu";
import "../../styles/main.css";

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

  const uesrMenuToggle = new ToggleMenu(
    new ToggleStrategy(),
    userMenuBtn,
    userMenuElement,
    "closed"
  );
  uesrMenuToggle.setMenu();

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
