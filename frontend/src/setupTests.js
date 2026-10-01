import { Window } from "happy-dom";
import { beforeEach } from "bun:test";

const window = new Window();
globalThis.window = window;
globalThis.document = window.document;
globalThis.navigator = window.navigator;
globalThis.HTMLElement = window.HTMLElement;
globalThis.HTMLButtonElement = window.HTMLButtonElement;
globalThis.customElements = window.customElements;

beforeEach(() => {
  if (globalThis.document && globalThis.document.body) {
    globalThis.document.body.innerHTML = "";
  }
});
