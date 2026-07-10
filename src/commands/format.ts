import * as vscode from "vscode";
import { CommandDefinition } from "../models/command";
import { getActiveDocumentText } from "../services/workspace";
import { jsonToTypeScript } from "../utils/json";
import { isValidJson } from "../utils/validation";
import { log } from "../services/logger";

async function formatJsonToTs(): Promise<void> {
  const text = getActiveDocumentText();
  if (!text || !isValidJson(text)) {
    vscode.window.showErrorMessage("Pro Tools: the active document does not contain valid JSON.");
    return;
  }

  try {
    const interfaceCode = jsonToTypeScript(text);
    const document = await vscode.workspace.openTextDocument({ language: "typescript", content: interfaceCode });
    await vscode.window.showTextDocument(document, vscode.ViewColumn.Beside);
    log("Generated TypeScript interface from JSON document.");
  } catch (error) {
    vscode.window.showErrorMessage(`Pro Tools: failed to convert JSON — ${(error as Error).message}`);
  }
}

export const formatCommands: CommandDefinition[] = [
  { id: "proVscodeTools.formatJsonToTs", handler: formatJsonToTs }
];
