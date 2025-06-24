import ToggleMenu from "../../components/Buttons/toggleMenu";
import "../../styles/main.css";

document.addEventListener("DOMContentLoaded", () => {
  const userMenuBtn = <HTMLButtonElement>(
    document.getElementById("user-menu-btn")
  );
  const userMenuElement = <HTMLElement>document.getElementById("user-menu");

  const uesrMenuToggle = new ToggleMenu(userMenuBtn, userMenuElement);

  uesrMenuToggle.toggleMenu("closed");
});
