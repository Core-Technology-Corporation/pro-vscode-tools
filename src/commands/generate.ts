import * as vscode from "vscode";
import { CommandDefinition } from "../models/command";
import { ComponentFramework } from "../types";
import { getExtensionConfig } from "../services/config";
import { getWorkspaceRoot, joinUri } from "../utils/paths";
import { writeTextFile, createDirectory } from "../services/file";
import { toPascalCase } from "../utils/strings";
import { log } from "../services/logger";

const TEMPLATES: Record<ComponentFramework, (name: string) => string> = {
  react: (name) => `export function ${name}() {\n  return <div>${name}</div>;\n}\n`,
  vue: (name) => `<template>\n  <div>${name}</div>\n</template>\n\n<script setup lang="ts">\n</script>\n`,
  laravel: (name) => `<?php\n\nnamespace App\\View\\Components;\n\nuse Illuminate\\View\\Component;\n\nclass ${name} extends Component\n{\n    public function render()\n    {\n        return view('components.${name.toLowerCase()}');\n    }\n}\n`
};

const EXTENSIONS: Record<ComponentFramework, string> = {
  react: "tsx",
  vue: "vue",
  laravel: "php"
};

async function generateComponent(): Promise<void> {
  const root = getWorkspaceRoot();
  if (!root) {
    vscode.window.showErrorMessage("Pro Tools: open a workspace folder before generating a component.");
    return;
  }

  const rawName = await vscode.window.showInputBox({ prompt: "Component name", placeHolder: "MyComponent" });
  if (!rawName) {
    return;
  }

  const { defaultComponentFramework } = getExtensionConfig();
  const framework = await vscode.window.showQuickPick(["react", "vue", "laravel"] as ComponentFramework[], {
    placeHolder: `Framework (default: ${defaultComponentFramework})`
  });
  const selectedFramework = (framework ?? defaultComponentFramework) as ComponentFramework;

  const name = toPascalCase(rawName);
  const content = TEMPLATES[selectedFramework](name);
  const targetDir = joinUri(root, "src", "components");
  const targetFile = joinUri(targetDir, `${name}.${EXTENSIONS[selectedFramework]}`);

  await createDirectory(targetDir);
  await writeTextFile(targetFile, content);
  await vscode.window.showTextDocument(targetFile);
  log(`Generated ${selectedFramework} component: ${name}`);
}

export const generateCommands: CommandDefinition[] = [
  { id: "proVscodeTools.generateComponent", handler: generateComponent }
];
