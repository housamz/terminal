import { TYPE_SPEED } from "../data/constants";
import { DOMUtils } from "../dom/dom-utils";

export class Typewriter {
  static render(
    outputLines: string[],
    name: string,
    speed: number = TYPE_SPEED
  ): void {
    if (outputLines.length === 0) return;

    const outputElement = DOMUtils.createDiv(`output ${name}`);
    const commandHistory = DOMUtils.getCommandHistory();
    commandHistory.appendChild(outputElement);

    if (speed === 0) {
      // Instantly render all lines at once
      for (const line of outputLines) {
        const lineElement = DOMUtils.createDiv("", line);
        outputElement.appendChild(lineElement);
      }
      DOMUtils.scrollToBottom();
      return;
    }

    // Character-by-character animation
    let lineIndex = 0;
    let charIndex = 0;

    const typewriter = setInterval(() => {
      if (lineIndex < outputLines.length) {
        if (charIndex === 0) {
          const lineElement = DOMUtils.createDiv();
          outputElement.appendChild(lineElement);
        }

        const currentLine = outputLines[lineIndex];
        const currentLineElement = outputElement.lastChild as HTMLElement;

        if (charIndex >= currentLine.length) {
          lineIndex++;
          charIndex = 0;
        } else {
          currentLineElement.innerHTML = currentLine.substring(
            0,
            charIndex + 1
          );
          charIndex++;
        }

        DOMUtils.scrollToBottom();
      } else {
        clearInterval(typewriter);
      }
    }, speed);
  }
}
