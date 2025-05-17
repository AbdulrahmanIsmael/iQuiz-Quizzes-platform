import "../styles/style.css";

class Events {
  private static menuBtn = document.getElementById(
    "menuBtn"
  ) as HTMLButtonElement;
  private static responsiveMenu = document.getElementById(
    "responsiveMenu"
  ) as HTMLDivElement;

  private static menuBtnHandler(menu: HTMLDivElement): void {
    menu.classList.toggle("max-md:!hidden");
  }

  public static setResponsiveMenu(): void {
    this.menuBtn.addEventListener("click", () => {
      this.menuBtnHandler(this.responsiveMenu);
    });
  }
}

Events.setResponsiveMenu();
