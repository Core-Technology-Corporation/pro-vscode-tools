import * as vscode from "vscode";
import { registerCommands } from "./commands";
import { registerTreeView } from "./providers/treeView";
import { registerCompletionProvider } from "./providers/completion";
import { registerHoverProvider } from "./providers/hover";
import { log } from "./services/logger";

export function activate(context: vscode.ExtensionContext): void {
  const treeProvider = registerTreeView(context);
  registerCommands(context, treeProvider);
  registerCompletionProvider(context);
  registerHoverProvider(context);

  log("Pro VSCode Tools activated.");
}

export function deactivate(): void {
  // No cleanup required: all disposables are owned by context.subscriptions.
}
