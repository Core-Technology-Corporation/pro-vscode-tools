import * as vscode from "vscode";

export function createWebviewPanel(context: vscode.ExtensionContext, title: string, html: string): vscode.WebviewPanel {
  const panel = vscode.window.createWebviewPanel("proVscodeToolsWebview", title, vscode.ViewColumn.One, {
    enableScripts: true
  });
  panel.webview.html = html;
  context.subscriptions.push(panel);
  return panel;
}
