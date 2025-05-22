import { PROMPT } from "./data/constants";
import { CommandHandler } from "./handlers/command-handler";
import { CursorManager } from "./dom/cursor-manager";
import { KeyboardHandler } from "./dom/keyboard-handler";
import { DOMUtils } from "./dom/dom-utils";

export class TerminalApp {
  private _commandHandler: CommandHandler;
  private _cursorManager: CursorManager;
  private _keyboardHandler: KeyboardHandler;

  constructor() {
    this._commandHandler = new CommandHandler();
    this._cursorManager = new CursorManager();
    this._keyboardHandler = new KeyboardHandler(
      this._commandHandler,
      this._cursorManager
    );
  }

  initialize(): void {
    this._setupDOM();
    this._commandHandler.showWelcomeScreen();
    this._setupEventListeners();
    this._cursorManager.updatePosition();
  }

  private _setupDOM(): void {
    const firstPrompt = DOMUtils.getFirstPrompt();
    firstPrompt.innerText = PROMPT;
  }

  private _setupEventListeners(): void {
    this._keyboardHandler.setupEventListeners();
  }
}
