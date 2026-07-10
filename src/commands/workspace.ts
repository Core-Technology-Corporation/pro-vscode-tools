import * as vscode from "vscode";
import { CommandDefinition } from "../models/command";
import { getWorkspaceRoot, joinUri } from "../utils/paths";
import { createDirectory, writeTextFile } from "../services/file";
import { log } from "../services/logger";

const DEFAULT_FOLDERS = ["src", "src/components", "src/utils", "test"];

async function createProjectStructure(): Promise<void> {
  const root = getWorkspaceRoot();
  if (!root) {
    vscode.window.showErrorMessage("Pro Tools: open a workspace folder before scaffolding a project structure.");
    return;
  }

  for (const folder of DEFAULT_FOLDERS) {
    await createDirectory(joinUri(root, ...folder.split("/")));
  }
  await writeTextFile(joinUri(root, "README.md"), "# Project\n");

  vscode.window.showInformationMessage("Pro Tools: project structure created.");
  log("Created default project structure.");
}

export const workspaceCommands: CommandDefinition[] = [
  { id: "proVscodeTools.createProjectStructure", handler: createProjectStructure }
];
