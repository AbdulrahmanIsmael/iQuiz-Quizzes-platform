export default class ToggleMenu {
  constructor(public button: HTMLButtonElement, public menu: HTMLElement) {
    this.toggleHandler = this.toggleHandler.bind(this);
  }

  private toggleHandler(classString: string): void {
    this.menu.classList.toggle(classString);
  }

  public toggleMenu(classString: string): void {
    this.button.addEventListener("click", () => {
      this.toggleHandler(classString);
    });
  }
}
