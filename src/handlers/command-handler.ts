import { data } from "../data/data";
import { apis } from "../data/api-config";
import { ApiService } from "./api-service";
import { Spinner } from "../dom/spinner";
import { Typewriter } from "./typewriter";
import { DOMUtils } from "../dom/dom-utils";
import type { CommandType } from "../types";
import { PROMPT } from "../data/constants";

export class CommandHandler {
  private _commands: string[] = [];

  public showWelcomeScreen(): void {
    const colors = ["grey", "blue", "purple"];

    Typewriter.render(
      data.welcome.lines.map((line: string, i: number) => {
        if (i > 1 && i <= 14) {
          const groupIndex = Math.floor((i - 2) / 5); // Group lines in sets of 5
          return DOMUtils.createSpan(
            line.replace(/0/g, " ").replace(/1/g, "="),
            null,
            colors[groupIndex % colors.length]
          );
        } else {
          return line;
        }
      }),
      "welcome",
      0
    );
  }

  async executeCommand(command: string): Promise<void> {
    // Add the command to history
    const commandLine = DOMUtils.createDiv(
      "",
      DOMUtils.createSpan(PROMPT, command, "prompt")
    );
    const commandHistory = DOMUtils.getCommandHistory();
    commandHistory.appendChild(commandLine);

    // Process the command
    let outputLines: string[] = [];
    let type = "";
    const theCommand = command.toLowerCase() as CommandType;
    this._commands.push(theCommand);

    switch (theCommand) {
      case "welcome":
        this.showWelcomeScreen();
        break;
      case "whoami":
      case "skills":
      case "projects":
      case "contact":
        outputLines = data[theCommand].lines;
        type = data[theCommand].type;
        break;

      case "help":
        const otherCommands = [
          {
            color: "blue",
            title: "date",
            text: "Display current date",
          },
          {
            color: "blue",
            title: "clear",
            text: "Clear the terminal",
          },
          {
            color: "blue",
            title: "history",
            text: "Show command history",
          },
          {
            color: "orange",
            title: "Arrow Keys",
            text: "To navigate history.",
          },
          { color: "orange", title: "Tab Key", text: "To complete commands." },
        ];
        outputLines = [
          "<i>Available commands:</i>",
          ...Object.entries(data).map(
            ([k, v]) => `<i>${k}</i> ${v.description}`
          ),
          ...Object.entries(apis).map(([k, v]) =>
            DOMUtils.createSpan(k, v.description, "green")
          ),
          ...otherCommands.map((i) =>
            DOMUtils.createSpan(i.title, i.text, i.color)
          ),
        ];
        type = "list";
        break;

      case "test":
        this._runTestCommands();
        return;

      case "history":
        outputLines = this._commands;
        break;

      case "date":
        outputLines = [
          DOMUtils.createSpan(new Date().toString(), null, "orange"),
        ];
        break;

      case "clear":
        commandHistory.innerHTML = "";
        return;

      case "joke":
      case "geek":
      case "fact":
        await this._handleApiCommand(theCommand);
        return;

      case "ip":
        await this._handleIpCommand();
        return;

      case "weather":
        await this._handleWeatherCommand();
        return;

      case "":
        outputLines = [];
        break;

      default:
        outputLines = this._createErrorMessage(command, true);
    }

    // Display output with typing effect
    if (outputLines.length > 0) {
      Typewriter.render(outputLines, type);
    }
  }

  private async _handleApiCommand(command: string): Promise<void> {
    Spinner.show();
    try {
      const output = await ApiService.fetchAPI(command);
      Spinner.stop();
      const outputArray = Array.isArray(output) ? output : [output];
      Typewriter.render(outputArray, "paragraph");
    } catch (error) {
      Spinner.stop();
      Typewriter.render(this._createErrorMessage(), "paragraph");
    }
  }

  private async _handleIpCommand(): Promise<void> {
    Spinner.show();
    try {
      const output = (await ApiService.fetchAPI("ip")) as string[];
      Spinner.stop();
      Typewriter.render(output, "list");
    } catch (error) {
      Spinner.stop();
      Typewriter.render(this._createErrorMessage("location"), "paragraph");
    }
  }

  private async _handleWeatherCommand(): Promise<void> {
    Spinner.show();
    try {
      const location = await ApiService.fetchLocation();
      const weatherLines = await ApiService.fetchWeather(location);
      Spinner.stop();
      Typewriter.render(weatherLines, "list");
    } catch (error) {
      Spinner.stop();
      Typewriter.render(this._createErrorMessage("weather"), "paragraph");
    }
  }

  private _runTestCommands(): void {
    [
      "help",
      "date",
      ...Object.keys(data).map((k) => k),
      ...Object.keys(apis).map((k) => k),
      "history",
    ].forEach((k, i) => setTimeout(() => this.executeCommand(k), i * 3000));
  }

  private _createErrorMessage(
    text?: string,
    isCommandError?: boolean
  ): string[] {
    const message = !text
      ? "Error fetching data. Please try again."
      : isCommandError
      ? `Command not found: ${text}. Type 'help' for available commands.`
      : `Error fetching ${text} data. Please try again.`;

    return [DOMUtils.createSpan(message, null, "red")];
  }

  getCommands(): string[] {
    return [...this._commands];
  }

  getAvailableCommands(): string[] {
    return [
      ...Object.keys(data),
      ...Object.keys(apis),
      "clear",
      "date",
      "history",
    ];
  }
}
