import * as vscode from "vscode";
import { CONFIG_SECTION } from "../utils/constants";
import { ExtensionConfig } from "../models/config";

export function getExtensionConfig(): ExtensionConfig {
  const config = vscode.workspace.getConfiguration(CONFIG_SECTION);
  return {
    defaultComponentFramework: config.get("defaultComponentFramework", "react")
  };
}
