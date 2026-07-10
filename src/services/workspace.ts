import * as vscode from "vscode";

export function getActiveEditor(): vscode.TextEditor | undefined {
  return vscode.window.activeTextEditor;
}

export function getActiveDocumentText(): string | undefined {
  return getActiveEditor()?.document.getText();
}

export async function replaceActiveDocumentText(newText: string): Promise<boolean> {
  const editor = getActiveEditor();
  if (!editor) {
    return false;
  }
  const fullRange = new vscode.Range(
    editor.document.positionAt(0),
    editor.document.positionAt(editor.document.getText().length)
  );
  return editor.edit((editBuilder) => editBuilder.replace(fullRange, newText));
}
