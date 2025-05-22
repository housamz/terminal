import { SPINNER_CHARS, DOM_IDS } from "../data/constants";
import { DOMUtils } from "./dom-utils";

export class Spinner {
  private static _interval: NodeJS.Timeout | null = null;

  static show(): void {
    let spinnerFrame = 0;
    const spinner = DOMUtils.createDiv(
      "output",
      `${DOMUtils.createSpan(
        "Waiting...",
        null,
        "orange"
      )} ${DOMUtils.createSpan(SPINNER_CHARS[0], null, "spinner")}`
    );
    spinner.id = DOM_IDS.SPINNER;

    const commandHistory = DOMUtils.getCommandHistory();
    commandHistory.appendChild(spinner);

    this._interval = setInterval(() => {
      spinnerFrame = (spinnerFrame + 1) % SPINNER_CHARS.length;
      const spinnerElement = spinner.querySelector(".spinner");
      if (spinnerElement) {
        spinnerElement.textContent = SPINNER_CHARS[spinnerFrame];
      }
    }, 100);
  }

  static stop(): void {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }

    const spinner = document.getElementById(DOM_IDS.SPINNER);
    if (spinner) {
      spinner.remove();
    }
  }
}
