import ToggleMenu from "./components/Buttons/toggleMenu";
import "./styles/main.css";

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = <HTMLButtonElement>document.getElementById("menuBtn");
  const responsiveMenu = <HTMLDivElement>(
    document.getElementById("responsiveMenu")
  );
  const navbarResponsiveMenu = new ToggleMenu(menuBtn, responsiveMenu);
  navbarResponsiveMenu.toggleMenu("hidden");
});
