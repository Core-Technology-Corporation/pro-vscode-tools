import * as vscode from "vscode";

export function getWorkspaceRoot(): vscode.Uri | undefined {
  return vscode.workspace.workspaceFolders?.[0]?.uri;
}

export function joinUri(base: vscode.Uri, ...segments: string[]): vscode.Uri {
  return vscode.Uri.joinPath(base, ...segments);
}
