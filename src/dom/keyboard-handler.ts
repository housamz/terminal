import { CommandHandler } from "../handlers/command-handler";
import { PROMPT } from "../data/constants";
import { CursorManager } from "./cursor-manager";
import { DOMUtils } from "./dom-utils";

export class KeyboardHandler {
  private _historyIndex = -1;

  private _commandHandler: CommandHandler;
  private _cursorManager: CursorManager;

  constructor(commandHandler: CommandHandler, cursorManager: CursorManager) {
    this._commandHandler = commandHandler;
    this._cursorManager = cursorManager;
  }

  setupEventListeners(): void {
    const commandInput = DOMUtils.getCommandInput();

    commandInput.addEventListener("keydown", (e) => this._handleKeyDown(e));
    commandInput.addEventListener("input", () =>
      this._cursorManager.updatePositionDebounced()
    );

    // Focus the input when clicking anywhere on the terminal
    document.body.addEventListener("click", () => {
      commandInput.focus();
    });
  }

  private async _handleKeyDown(e: KeyboardEvent): Promise<void> {
    const commandInput = DOMUtils.getCommandInput();

    switch (e.key) {
      case "Enter":
        await this._handleEnter(e, commandInput);
        break;
      case "ArrowUp":
        this._handleArrowUp(e, commandInput);
        break;
      case "ArrowDown":
        this._handleArrowDown(e, commandInput);
        break;
      case "Tab":
        this._handleTab(e, commandInput);
        break;
    }

    this._cursorManager.updatePosition();
  }

  private async _handleEnter(
    e: KeyboardEvent,
    commandInput: HTMLInputElement
  ): Promise<void> {
    e.preventDefault();
    const command = commandInput.value.trim();
    await this._commandHandler.executeCommand(command);
    commandInput.value = "";
    this._historyIndex = -1; // Reset history index after executing command
  }

  private _handleArrowUp(
    e: KeyboardEvent,
    commandInput: HTMLInputElement
  ): void {
    e.preventDefault();
    const commands = this._commandHandler.getCommands();
    // Navigate backward in command history
    if (this._historyIndex < commands.length - 1) {
      this._historyIndex++;
      commandInput.value = commands[commands.length - 1 - this._historyIndex];
    }
  }

  private _handleArrowDown(
    e: KeyboardEvent,
    commandInput: HTMLInputElement
  ): void {
    e.preventDefault();
    const commands = this._commandHandler.getCommands();
    // Navigate forward in command history
    if (this._historyIndex > 0) {
      this._historyIndex--;
      commandInput.value = commands[commands.length - 1 - this._historyIndex];
    } else if (this._historyIndex === 0) {
      this._historyIndex = -1;
      commandInput.value = "";
    }
  }

  private _handleTab(e: KeyboardEvent, commandInput: HTMLInputElement): void {
    e.preventDefault();
    const currentInput = commandInput.value.toLowerCase();

    if (!currentInput) return;

    const availableCommands = this._commandHandler.getAvailableCommands();
    const matchingCommands = availableCommands.filter((cmd) =>
      cmd.startsWith(currentInput)
    );

    if (matchingCommands.length === 1) {
      // Complete the command
      commandInput.value = matchingCommands[0];
    } else if (matchingCommands.length > 1) {
      // Show possible completions
      this._showCompletions(currentInput, matchingCommands);
    }
  }

  private _showCompletions(
    currentInput: string,
    matchingCommands: string[]
  ): void {
    const commandHistory = DOMUtils.getCommandHistory();

    // Add command to history but don't execute
    const commandLine = DOMUtils.createDiv(
      "",
      DOMUtils.createSpan(PROMPT, currentInput, "prompt")
    );
    commandHistory.appendChild(commandLine);

    // Display possible completions
    const outputElement = DOMUtils.createDiv(
      "output",
      matchingCommands.join("&nbsp;&nbsp;&nbsp;")
    );
    commandHistory.appendChild(outputElement);

    // Scroll to bottom
    DOMUtils.scrollToBottom();
  }
}
