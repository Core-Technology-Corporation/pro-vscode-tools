import * as vscode from "vscode";
import { toDisposable } from "../models/command";
import { formatCommands } from "./format";
import { generateCommands } from "./generate";
import { workspaceCommands } from "./workspace";
import { terminalCommands } from "./terminal";
import { QuickActionsTreeDataProvider } from "../providers/treeView";

export function registerCommands(context: vscode.ExtensionContext, treeProvider: QuickActionsTreeDataProvider): void {
  const allCommands = [...formatCommands, ...generateCommands, ...workspaceCommands, ...terminalCommands];
  allCommands.forEach((definition) => toDisposable(context, definition));

  toDisposable(context, {
    id: "proVscodeTools.refreshQuickActions",
    handler: () => treeProvider.refresh()
  });
}
