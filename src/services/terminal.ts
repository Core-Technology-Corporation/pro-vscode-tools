import * as vscode from "vscode";

export function runInTerminal(command: string, terminalName = "Pro Tools"): void {
  const terminal =
    vscode.window.terminals.find((existing) => existing.name === terminalName) ??
    vscode.window.createTerminal(terminalName);
  terminal.show();
  terminal.sendText(command);
}
