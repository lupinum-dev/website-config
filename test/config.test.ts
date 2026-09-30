import { fileURLToPath } from 'node:url'
import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'
import { lupinumTemplateLint } from '../src/eslint.js'
import { lupinumVite } from '../src/index.js'

const fixtures = fileURLToPath(new URL('./fixtures/', import.meta.url))

async function lint(shadcn?: 'error' | 'warn' | 'off') {
  const eslint = new ESLint({ cwd: fixtures, overrideConfigFile: true, overrideConfig: lupinumTemplateLint({ shadcn }) })
  const [result] = await eslint.lintFiles(['Broken.vue'])
  return Object.fromEntries(result!.messages.map(m => [m.ruleId, m.severity]))
}

// A plugin or parser upgrade that breaks the wiring would silently stop all template checks.
describe('lupinumTemplateLint', () => {
  it.each([
    ['error', 2],
    ['warn', 1],
    ['off', undefined],
  ] as const)('reports template mistakes; shadcn rules at %s', async (level, severity) => {
    const rules = await lint(level)
    expect(rules['vue/require-v-for-key']).toBe(2)
    expect(rules['vuejs-accessibility/alt-text']).toBe(2)
    expect(rules['shadcn/no-raw-colors']).toBe(severity)
  })
})

describe('lupinumVite', () => {
  it('keeps defaults when a site adds ignores and rules', () => {
    const config = lupinumVite({ ignore: ['legacy/**'], rules: { 'no-console': 'off' } })
    expect(config.fmt.ignorePatterns).toEqual(expect.arrayContaining(['content/**', '.nuxt/**', 'legacy/**']))
    expect(config.lint.ignorePatterns).toEqual(expect.arrayContaining(['.nuxt/**', 'legacy/**']))
    expect(config.lint.rules).toEqual({ 'eqeqeq': 'error', 'no-console': 'off' })
  })
})
