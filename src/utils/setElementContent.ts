import { T_content } from "../types/utils-types";

export function setElementContent(element: HTMLElement, content: T_content) {
  if (element instanceof HTMLElement) {
    if (typeof content === "string") {
      element.textContent = content;
    } else if (
      content instanceof HTMLElement ||
      content instanceof DocumentFragment
    ) {
      element.appendChild(content);
    }
  }
}
