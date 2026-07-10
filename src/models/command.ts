import * as vscode from "vscode";

export interface CommandDefinition {
  id: string;
  handler: (...args: unknown[]) => unknown | Promise<unknown>;
}

export function toDisposable(context: vscode.ExtensionContext, definition: CommandDefinition): void {
  context.subscriptions.push(vscode.commands.registerCommand(definition.id, definition.handler));
}
