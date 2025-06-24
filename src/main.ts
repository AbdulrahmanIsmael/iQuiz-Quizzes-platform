import ToggleMenu, { ToggleStrategy } from "./components/Buttons/toggleMenu";
import "./styles/main.css";

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = <HTMLButtonElement>document.getElementById("menuBtn");
  const responsiveMenu = <HTMLDivElement>(
    document.getElementById("responsiveMenu")
  );
  const navbarResponsiveMenu = new ToggleMenu(
    new ToggleStrategy(),
    menuBtn,
    responsiveMenu,
    "hidden"
  );

  navbarResponsiveMenu.setMenu();
});
