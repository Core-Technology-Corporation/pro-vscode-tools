# Pro VSCode Tools

Extensión de Visual Studio Code con utilidades de productividad para el día a día: conversión de JSON a interfaces TypeScript, generación de componentes, creación de estructura de proyecto, comandos rápidos de terminal y una vista **Quick Actions** en el Explorador.

> Estado: versión `0.0.1`, marcada como *Unreleased* en el [CHANGELOG](CHANGELOG.md). Todavía no se publicó en el Marketplace.

## Funcionalidades

| Comando | ID | Qué hace |
|---|---|---|
| Pro Tools: Convert JSON to TypeScript Interface | `proVscodeTools.formatJsonToTs` | Valida el JSON del documento activo y abre al lado una pestaña nueva con las interfaces TypeScript inferidas; los objetos anidados generan interfaces propias. |
| Pro Tools: Generate Component | `proVscodeTools.generateComponent` | Pide un nombre y un framework (React, Vue o Laravel) y crea `src/components/<Nombre>.<tsx\|vue\|php>` a partir de una plantilla. |
| Pro Tools: Create Project Structure | `proVscodeTools.createProjectStructure` | Crea las carpetas `src`, `src/components`, `src/utils` y `test` en la raíz del workspace. |
| Pro Tools: Run Quick Terminal Command | `proVscodeTools.runQuickCommand` | Muestra un selector con `npm install`, `npm run build`, `npm test`, `git status` y `git pull`, y ejecuta el elegido en una terminal. |
| Pro Tools: Refresh Quick Actions | `proVscodeTools.refreshQuickActions` | Refresca la vista Quick Actions. |

Además, la extensión incluye:

- **Vista "Pro Tools: Quick Actions"** en el Explorador, con acceso directo a los cuatro comandos principales.
- **Completado y hover** para JavaScript y TypeScript: sugiere `console.log(${1:value});`.
- **Snippets** para JavaScript, TypeScript y Python (`snippets/*.json`).
- **Configuración** `proVscodeTools.defaultComponentFramework` (`react` | `vue` | `laravel`, por defecto `react`).

## Arquitectura

```
src/
├── extension.ts      # activate(): registra la vista, los comandos, el completado y el hover
├── commands/         # format, generate, workspace, terminal (+ index que los registra)
├── providers/        # treeView (Quick Actions), completion, hover, webview
├── services/         # config, file (workspace.fs), logger (OutputChannel), terminal, workspace
├── models/ types/    # definiciones de comandos y configuración
└── utils/            # json (JSON → TS), paths, strings (PascalCase), validation
test/                 # Mocha + @vscode/test-electron (runTest.ts, suite/, fixtures/)
snippets/             # javascript.json, typescript.json, python.json
```

Cada módulo de comandos exporta un arreglo `CommandDefinition[]` (`{ id, handler }`), y `commands/index.ts` los registra todos. Todas las suscripciones se agregan a `context.subscriptions`, así que `deactivate()` no tiene que liberar nada.

## Tecnologías

- TypeScript `^5.4` compilado con `tsc` a `out/`.
- API de VS Code `^1.80.0`.
- ESLint 8 con `@typescript-eslint` 7.
- Mocha 10 y `@vscode/test-electron` para las pruebas.
- `@vscode/vsce` para empaquetar.

## Desarrollo

```bash
npm install
npm run compile     # tsc -p ./
npm run watch       # tsc en modo watch
npm run lint
npm test            # compila y ejecuta las pruebas en una instancia de VS Code
npm run package     # vsce package → .vsix
```

Presioná `F5` para abrir un *Extension Development Host* con la extensión cargada.

## Seguridad y consideraciones

- La extensión no hace llamadas de red. Escribe en disco solo dentro del workspace abierto: componentes nuevos y carpetas.
- **Generate Component** sobrescribe el archivo si ya existe uno con el mismo nombre (`writeTextFile` no lo comprueba antes).
- **Run Quick Terminal Command** ejecuta comandos fijos; el usuario no escribe texto libre.

## Limitaciones conocidas

- La plantilla de Laravel solo genera la clase PHP, no la vista Blade.
- La estructura de proyecto es fija; no se puede configurar.
- `media/` incluye `script.js` y `styles.css` para un webview que todavía no expone ningún comando.

## Licencia

[MIT](LICENSE)
