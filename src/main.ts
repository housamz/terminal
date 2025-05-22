import "./style.scss";
import { TerminalApp } from "./terminal-app";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<div id="command-history"></div>
<div class="input-line">
  <span class="prompt" id="first-prompt"></span>
  <input
    class="command-input"
    id="command-input"
    type="text"
    autofocus="autofocus"
  />
  <span class="cursor" id="cursor"></span>
</div>
`;

// Initialize the terminal application when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const app = new TerminalApp();
  app.initialize();
});

// Export for potential external use
export { TerminalApp };
