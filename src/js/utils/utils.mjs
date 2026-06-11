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

export function showLoading(containerElement) {
  containerElement.innerHTML = `<div class="loading-spinner"></div>`;
}

export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
