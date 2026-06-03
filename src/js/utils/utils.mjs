import { headerTemplate, footerTemplate } from "./templates.mjs";

export function loadHeaderFooter() {
  const headerElement = document.querySelector("header");
  const footerElement = document.querySelector("footer");

  if (headerElement) {
    headerElement.innerHTML = headerTemplate();
  }

  if (footerElement) {
    footerElement.innerHTML = footerTemplate();
  }
}
