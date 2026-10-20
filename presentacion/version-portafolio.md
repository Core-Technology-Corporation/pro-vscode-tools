# Pro VSCode Tools

## Descripción breve (tarjeta)

Extensión de VS Code con herramientas para desarrolladores: convierte JSON en interfaces TypeScript, genera componentes React, Vue o Laravel, crea la estructura base de un proyecto y ejecuta comandos de terminal frecuentes desde un panel de acciones rápidas.

## Descripción completa

Pro VSCode Tools reúne utilidades de uso diario en una vista **Quick Actions** dentro del Explorador y en la paleta de comandos:

- **Convertir JSON a TypeScript**: infiere los tipos del documento activo y genera una interfaz por cada objeto anidado.
- **Generar componente**: crea `src/components/<Nombre>` con la plantilla del framework elegido.
- **Crear estructura de proyecto**: crea `src`, `src/components`, `src/utils` y `test`.
- **Comandos rápidos de terminal**: npm install, build, test, git status y git pull.

También aporta snippets para JavaScript, TypeScript y Python, más completado y hover básicos.

## Problema que resuelve

Evita escribir a mano interfaces para respuestas JSON, copiar y pegar plantillas de componentes y teclear una y otra vez los mismos comandos de terminal.

## Objetivo

Centralizar pequeñas automatizaciones en una extensión con una arquitectura ordenada y fácil de ampliar con comandos nuevos.

## Público objetivo

Desarrolladores frontend y full stack que trabajan con TypeScript, React, Vue o Laravel.

## Mi participación técnica

Confirmado por el historial de git: autor de los 4 commits (2026-07-09 → 2026-07-10). El detalle por componente queda **pendiente de confirmar**.

## Funcionalidades destacadas

- Conversión de JSON a TypeScript con interfaces anidadas (`Address`, `Root`).
- Generador de componentes para tres frameworks, configurable con `proVscodeTools.defaultComponentFramework`.
- Vista Quick Actions con acceso con un clic.
- Snippets multilenguaje.

## Tecnologías

| Categoría | Tecnologías |
|---|---|
| Lenguaje | TypeScript 5.4 (`tsc`) |
| Plataforma | API de VS Code (^1.80): TreeDataProvider, CompletionItemProvider, HoverProvider, `workspace.fs`, terminal |
| Calidad | ESLint 8 + `@typescript-eslint`, Mocha 10, `@vscode/test-electron` |
| Empaquetado | `@vscode/vsce` |

## Arquitectura y aspectos técnicos

- Comandos declarados como `CommandDefinition { id, handler }` por módulo y registrados de forma centralizada, así que agregar un comando no requiere tocar `extension.ts`.
- Capa de servicios (archivos, configuración, logger, terminal, workspace) separada de los comandos.
- Utilidades puras (`utils/json`, `strings`, `paths`, `validation`) que se pueden probar sin VS Code.

## Seguridad

Sin acceso a red. Solo escribe dentro del workspace abierto y los comandos de terminal son una lista fija.

## Retos técnicos

- Inferir tipos TypeScript desde JSON arbitrario, con objetos anidados y nombres en PascalCase.
- Diseñar la estructura para que crezca con comandos nuevos.

## Mejoras futuras recomendadas

- Evitar que Generate Component sobrescriba archivos existentes.
- Hacer configurables las plantillas de componentes y la estructura del proyecto.
- Ampliar la cobertura de pruebas.

## Estado

Publicada en el Visual Studio Code Marketplace como `alvarosiles.pro-vscode-tools` (versión inicial `0.0.1`, verificado el 2026-10-20). El CHANGELOG todavía la marca como *Unreleased*.

## Capturas

| Archivo | Contenido |
|---|---|
| `presentacion/01-vista-principal.png` | Explorador con la vista **Pro Tools: Quick Actions** y el punto de entrada `extension.ts`. |
| `presentacion/02-funcionalidad-principal.png` | **Convert JSON to TypeScript Interface**: `sample.json` a la izquierda y las interfaces generadas (`Address`, `Root`) a la derecha. |
| `presentacion/03-funcionalidad-complementaria.png` | **Generate Component**: el componente `UserCard.tsx` recién creado en `src/components/`. |

Capturas de la extensión ejecutándose en un *Extension Development Host*, sobre una copia del repositorio.
