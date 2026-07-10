import * as vscode from "vscode";
import { QuickActionItem } from "../types";

const QUICK_ACTIONS: QuickActionItem[] = [
  { id: "format", label: "Convert JSON to TypeScript", command: "proVscodeTools.formatJsonToTs" },
  { id: "generate", label: "Generate Component", command: "proVscodeTools.generateComponent" },
  { id: "workspace", label: "Create Project Structure", command: "proVscodeTools.createProjectStructure" },
  { id: "terminal", label: "Run Quick Terminal Command", command: "proVscodeTools.runQuickCommand" }
];

export class QuickActionsTreeDataProvider implements vscode.TreeDataProvider<QuickActionItem> {
  private readonly onDidChangeTreeDataEmitter = new vscode.EventEmitter<void>();
  readonly onDidChangeTreeData = this.onDidChangeTreeDataEmitter.event;

  refresh(): void {
    this.onDidChangeTreeDataEmitter.fire();
  }

  getTreeItem(element: QuickActionItem): vscode.TreeItem {
    const item = new vscode.TreeItem(element.label, vscode.TreeItemCollapsibleState.None);
    item.command = { command: element.command, title: element.label };
    item.iconPath = new vscode.ThemeIcon("symbol-event");
    return item;
  }

  getChildren(element?: QuickActionItem): QuickActionItem[] {
    return element ? [] : QUICK_ACTIONS;
  }
}

export function registerTreeView(context: vscode.ExtensionContext): QuickActionsTreeDataProvider {
  const provider = new QuickActionsTreeDataProvider();
  context.subscriptions.push(vscode.window.registerTreeDataProvider("proVscodeTools.quickActions", provider));
  return provider;
}
