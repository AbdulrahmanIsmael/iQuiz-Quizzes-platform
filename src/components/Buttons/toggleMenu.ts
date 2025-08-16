import { I_ToggleStrategy } from "../../types/components-types";
export default class ToggleMenu {
  constructor(
    public menuStrategy: I_ToggleStrategy,
    public btn: HTMLButtonElement,
    public menu: HTMLElement,
    public classString: string = "toggle"
  ) {}

  public setMenuStrategy(newMenuStrategy: I_ToggleStrategy): void {
    this.menuStrategy = newMenuStrategy;
  }

  public setMenu(): void {
    this.menuStrategy.setMenu(this.btn, this.menu, this.classString);
  }
}

export class ToggleStrategy implements I_ToggleStrategy {
  public setMenu(
    btn: HTMLButtonElement,
    menu: HTMLElement,
    classString: string
  ): void {
    btn.addEventListener("click", () => {
      menu.classList.toggle(classString);
    });
  }
}

export class AddStrategy implements I_ToggleStrategy {
  public setMenu(
    btn: HTMLButtonElement,
    menu: HTMLElement,
    classString: string
  ): void {
    btn.addEventListener("click", () => {
      menu.classList.add(classString);
    });
  }
}
export class RemoveStrategy implements I_ToggleStrategy {
  public setMenu(
    btn: HTMLButtonElement,
    menu: HTMLElement,
    classString: string
  ): void {
    btn.addEventListener("click", () => {
      menu.classList.remove(classString);
    });
  }
}
