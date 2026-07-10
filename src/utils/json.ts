import { toPascalCase } from "./strings";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

function inferType(value: JsonValue, interfaceName: string, extraInterfaces: string[]): string {
  if (value === null) {
    return "null";
  }
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "unknown[]";
    }
    return `${inferType(value[0], interfaceName, extraInterfaces)}[]`;
  }
  switch (typeof value) {
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "object": {
      const nestedName = toPascalCase(interfaceName);
      extraInterfaces.push(buildInterface(nestedName, value as Record<string, JsonValue>));
      return nestedName;
    }
    default:
      return "unknown";
  }
}

function buildInterface(name: string, obj: Record<string, JsonValue>): string {
  const extraInterfaces: string[] = [];
  const fields = Object.entries(obj)
    .map(([key, value]) => `  ${key}: ${inferType(value, toPascalCase(key), extraInterfaces)};`)
    .join("\n");
  return [...extraInterfaces, `export interface ${name} {\n${fields}\n}`].join("\n\n");
}

export function jsonToTypeScript(json: string, rootName = "Root"): string {
  const parsed = JSON.parse(json) as JsonValue;
  if (Array.isArray(parsed) || typeof parsed !== "object" || parsed === null) {
    throw new Error("Root JSON value must be an object to generate a TypeScript interface.");
  }
  return buildInterface(toPascalCase(rootName), parsed as Record<string, JsonValue>);
}
