import { CHAR_WIDTH, PROMPT } from '../data/constants';
import { DOMUtils } from './dom-utils';

export class CursorManager {
  private _cursorTimeout: NodeJS.Timeout | null = null;

  updatePosition(): void {
    const commandInput = DOMUtils.getCommandInput();
    const cursor = DOMUtils.getCursor();
    const left = (PROMPT.length + commandInput.value.length) * CHAR_WIDTH;
    cursor.style.left = `${left}px`;
  }

  updatePositionDebounced(): void {
    if (this._cursorTimeout) {
      clearTimeout(this._cursorTimeout);
    }
    this._cursorTimeout = setTimeout(() => this.updatePosition(), 10);
  }
}