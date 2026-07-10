import * as vscode from "vscode";

const LANGUAGES = ["javascript", "typescript"];

export class ProToolsHoverProvider implements vscode.HoverProvider {
  provideHover(document: vscode.TextDocument, position: vscode.Position): vscode.Hover | undefined {
    const range = document.getWordRangeAtPosition(position);
    if (!range) {
      return undefined;
    }
    const word = document.getText(range);
    return new vscode.Hover(`**Pro Tools** — \`${word}\``, range);
  }
}

export function registerHoverProvider(context: vscode.ExtensionContext): void {
  const provider = new ProToolsHoverProvider();
  context.subscriptions.push(vscode.languages.registerHoverProvider(LANGUAGES, provider));
}
