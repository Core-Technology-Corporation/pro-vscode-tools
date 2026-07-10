export type ComponentFramework = "react" | "vue" | "laravel";

export interface QuickActionItem {
  id: string;
  label: string;
  description?: string;
  command: string;
}
