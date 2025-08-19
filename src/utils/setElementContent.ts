import { T_content } from "../types/utils-types";

export function setElementContent(
  element: HTMLElement,
  content: T_content,
  loading: HTMLImageElement
) {
  if (element instanceof HTMLElement) {
    if (typeof content === "string") {
      if (loading) loading.classList.add("hidden");
      element.textContent = content;
    } else if (
      content instanceof HTMLElement ||
      content instanceof DocumentFragment
    ) {
      if (loading) loading.classList.add("hidden");
      element.appendChild(content);
    }
  }
}
