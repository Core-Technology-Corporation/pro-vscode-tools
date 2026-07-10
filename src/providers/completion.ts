import * as vscode from "vscode";

const LANGUAGES = ["javascript", "typescript"];

export class ProToolsCompletionProvider implements vscode.CompletionItemProvider {
  provideCompletionItems(): vscode.CompletionItem[] {
    const item = new vscode.CompletionItem("proToolsConsoleLog", vscode.CompletionItemKind.Snippet);
    item.insertText = new vscode.SnippetString("console.log(${1:value});");
    item.detail = "Pro Tools snippet";
    return [item];
  }
}

export function registerCompletionProvider(context: vscode.ExtensionContext): void {
  const provider = new ProToolsCompletionProvider();
  context.subscriptions.push(vscode.languages.registerCompletionItemProvider(LANGUAGES, provider));
}
