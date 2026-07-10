import * as vscode from "vscode";
import { CommandDefinition } from "../models/command";
import { runInTerminal } from "../services/terminal";

const QUICK_COMMANDS = ["npm install", "npm run build", "npm test", "git status", "git pull"];

async function runQuickCommand(): Promise<void> {
  const selected = await vscode.window.showQuickPick(QUICK_COMMANDS, { placeHolder: "Select a command to run" });
  if (!selected) {
    return;
  }
  runInTerminal(selected);
}

export const terminalCommands: CommandDefinition[] = [
  { id: "proVscodeTools.runQuickCommand", handler: runQuickCommand }
];
