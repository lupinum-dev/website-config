<p align="center"><img src="docs/public/icon.svg" width="128" alt="Website config icon"></p>
<h1 align="center">Website config</h1>
<p align="center">Shared Vite+ and template ESLint configuration for Lupinum Nuxt websites.</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@lupinum/website-config"><img alt="npm" src="https://img.shields.io/npm/v/@lupinum/website-config"></a>
  <a href="https://github.com/lupinum-dev/website-config/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/lupinum-dev/website-config/actions/workflows/ci.yml/badge.svg"></a>
  <a href="LICENSE"><img alt="MIT license" src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
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

## Quick start

```ts
// vite.config.ts
import { defineConfig } from 'vite-plus'
import { lupinumVite } from '@lupinum/website-config'

export default defineConfig(lupinumVite())
```

```js
// eslint.config.js
import { lupinumTemplateLint } from '@lupinum/website-config/eslint'

export default lupinumTemplateLint()
```

## Use a coding agent

A coding agent is a development tool that can inspect and change your project.

Copy this task prompt into your application agent:

```text
Use the installed @lupinum/website-config package to implement my requested feature.
Read the application's instructions first. Resolve @lupinum/website-config/agent-docs
from this application directory and read the relevant local pages.
Preserve the existing AGENTS.md. If it has no equivalent guidance, append
one short note to resolve installed package docs before integration work
and after dependency changes. Do not install a consumer skill.
Check the completed feature using this project's normal commands.
```

The installed documentation matches the package version. If an older version
has no documentation export, use its README, types and matching release docs.

## Documentation

Read the full documentation at [website-config.lupinum.com](https://website-config.lupinum.com).

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md). Run `pnpm verify` before you open a pull request.

## Support and security

Ask questions in the [Lupinum OSS Discord](https://discord.gg/RPH6SeA36N). Report vulnerabilities privately as described in [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE) © Lupinum OG.
