<h1 align="center">Website config</h1>
<p align="center">Shared Vite+ and template ESLint configuration for Lupinum Nuxt websites.</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@lupinum/website-config"><img alt="npm" src="https://img.shields.io/npm/v/@lupinum/website-config"></a>
  <a href="https://github.com/lupinum-dev/website-config/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/lupinum-dev/website-config/actions/workflows/ci.yml/badge.svg"></a>
  <a href="LICENSE"><img alt="MIT license" src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
  <a href="https://discord.lupinum.com"><img alt="Discord" src="https://img.shields.io/badge/Discord-join%20the%20chat-5865F2?logo=discord&logoColor=white"></a>
</p>

## Why use Website config?

One place for the lint and format settings of every Lupinum Nuxt website. Sites import two functions instead of copying config files, and Renovate rolls out every change as a normal dependency update.

Oxlint and oxfmt (through [Vite+](https://viteplus.dev)) check script code and format everything. ESLint checks only Vue `<template>` blocks, because oxlint cannot read them yet. The rules come from the Lupinum website handbook (standard F-07).

## Requirements

- Node.js 22.14 or later, Node.js 24, or Node.js 26.

## Installation

```bash
pnpm add -D @lupinum/website-config vite-plus eslint
```

The package brings the ESLint plugins (`eslint-plugin-vue`, `eslint-plugin-vuejs-accessibility`, `typescript-eslint`, `@shadcn/lint`) at versions tested together. Do not add them to the site yourself.

## Vite+: format, lint, test

```ts
// vite.config.ts
import { defineConfig } from 'vite-plus'
import { lupinumVite } from '@lupinum/website-config'

export default defineConfig(lupinumVite())
```

This sets up:

- **oxfmt** for code, Vue files and CSS, with Tailwind class sorting. `content/**` is never formatted, because oxfmt would rewrite MDC components.
- **oxlint** for script code with the `vue`, `import`, `typescript`, `unicorn` and `oxc` plugins: correctness as errors, suspicious code as warnings, and type-aware rules in `.ts` files. Type errors are left to `nuxt typecheck`, because oxlint's type checker cannot resolve `.vue` imports.
- **Vitest** for `app/**/*.test.ts` and `server/**/*.test.ts`.

All options are optional:

| Option | Default | Use |
| --- | --- | --- |
| `stylesheet` | `app/assets/css/main.css` | The Tailwind v4 entry file used to sort classes |
| `ignore` | `[]` | Extra paths the formatter and linter skip |
| `rules` | `{}` | Oxlint rules to add or change, merged over the defaults |
| `testInclude` | see above | Test file patterns |

## ESLint: Vue templates only

ESLint checks Vue rules (`:key` in `v-for`, `v-if` with `v-for`, `v-html`), accessibility (`alt`, labels, keyboard handlers) and the [shadcn design-system rules](https://github.com/shadcn-ui/lint) (no raw colors, arbitrary values, unknown classes, inline styles or restyled components).

```js
// eslint.config.js
import { lupinumTemplateLint } from '@lupinum/website-config/eslint'

export default lupinumTemplateLint()
```

Run it on templates only: `eslint --max-warnings=0 "app/**/*.vue"`.

| Option | Default | Use |
| --- | --- | --- |
| `shadcn` | `'error'` | Severity of the design-system rules. An existing site starts with `'warn'` and tightens later. |
| `ignores` | `[]` | Extra paths ESLint skips |

Flat-config objects after the options are appended and win over the defaults:

```js
export default lupinumTemplateLint({}, { files: ['app/components/legacy/**'], rules: { 'shadcn/no-arbitrary-values': 'off' } })
```

## Scripts

```json
{
  "lint:vue": "eslint --max-warnings=0 \"app/**/*.vue\"",
  "typecheck": "nuxt typecheck",
  "verify": "vp check && vp run lint:vue && vp run typecheck && vp test run --passWithNoTests && vp run generate"
}
```

Start Nuxt with `vp run dev`, never `vp dev`: the built-in command starts plain Vite. Nuxt prints `NUXT_B5004` about `vite.config.ts` at startup. That is expected: Vite+ needs the file and Nuxt does not read it.

## Contributing

Read [CONTRIBUTING.md](.github/CONTRIBUTING.md). Run `pnpm verify` before you open a pull request.

## Support and security

Ask questions in the [Lupinum OSS Discord](https://discord.lupinum.com). Report vulnerabilities privately as described in [SECURITY.md](.github/SECURITY.md).

## License

[MIT](LICENSE) © Lupinum OG.
