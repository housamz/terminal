import { DOM_IDS } from "../data/constants";

export class DOMUtils {
  static get(id: string): HTMLElement {
    const element = document.getElementById(id);
    if (!element) {
      throw new Error(`Element with id "${id}" not found`);
    }
    return element;
  }

  static getCommandInput(): HTMLInputElement {
    return this.get(DOM_IDS.COMMAND_INPUT) as HTMLInputElement;
  }

  static getTerminalContent(): HTMLElement {
    return this.get(DOM_IDS.APP);
  }

  static getCommandHistory(): HTMLElement {
    return this.get(DOM_IDS.COMMAND_HISTORY);
  }

  static getCursor(): HTMLElement {
    return this.get(DOM_IDS.CURSOR);
  }

  static getFirstPrompt(): HTMLElement {
    return this.get(DOM_IDS.FIRST_PROMPT);
  }

  static createDiv(className?: string, innerHTML?: string): HTMLDivElement {
    const div = document.createElement("div");
    if (className) div.className = className;
    if (innerHTML) div.innerHTML = innerHTML;
    return div;
  }

  static createSpan(
    title?: string,
    text?: string | null,
    className?: string
  ): string {
    return `<span ${className ? `class="${className}"` : ""}>${
      title ?? ""
    }</span>${text ? " " + text : ""}`;
  }

  static scrollToBottom(): void {
    const terminalContent = this.getTerminalContent();
    terminalContent.scrollTop = terminalContent.scrollHeight;
  }
}
