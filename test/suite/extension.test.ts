import * as assert from "assert";
import { jsonToTypeScript } from "../../src/utils/json";
import { toPascalCase, toKebabCase } from "../../src/utils/strings";

suite("Pro VSCode Tools", () => {
  test("jsonToTypeScript generates an interface from a flat object", () => {
    const result = jsonToTypeScript('{"name": "Ada", "age": 36}', "Person");
    assert.match(result, /export interface Person \{/);
    assert.match(result, /name: string;/);
    assert.match(result, /age: number;/);
  });

  test("toPascalCase converts kebab-case to PascalCase", () => {
    assert.strictEqual(toPascalCase("my-component"), "MyComponent");
  });

  test("toKebabCase converts PascalCase to kebab-case", () => {
    assert.strictEqual(toKebabCase("MyComponent"), "my-component");
  });
});
