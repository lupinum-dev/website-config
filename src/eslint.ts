import type { Linter } from 'eslint'
import { plugin as shadcn } from '@shadcn/lint'
import pluginVue from 'eslint-plugin-vue'
import pluginA11y from 'eslint-plugin-vuejs-accessibility'
import tseslint from 'typescript-eslint'

export interface TemplateLintOptions {
  /** Severity of the design-system rules. `warn` while an existing site adopts them. */
  shadcn?: 'error' | 'warn' | 'off'
  /** Extra glob patterns ESLint skips. */
  ignores?: string[]
}

export const shadcnRules = [
  'no-raw-colors',
  'no-unknown-classes',
  'no-arbitrary-values',
  'no-inline-styles',
  'no-restyle',
  'require-static-classes',
] as const

/**
 * ESLint for Vue `<template>` blocks: Vue rules, accessibility and the shadcn
 * design-system rules. Oxlint cannot read templates, so this is the only check for them.
 * Extra flat-config objects are appended and win over the defaults.
 */
export function lupinumTemplateLint(options: TemplateLintOptions = {}, ...extra: Linter.Config[]): Linter.Config[] {
  const level = options.shadcn ?? 'error'
  return [
    { ignores: ['.nuxt/**', '.output/**', 'node_modules/**', 'dist/**', ...(options.ignores ?? [])] },
    ...pluginVue.configs['flat/essential'],
    ...pluginA11y.configs['flat/recommended'],
    {
      files: ['**/*.vue'],
      languageOptions: { parserOptions: { parser: tseslint.parser } },
      plugins: { shadcn },
      rules: {
        'vue/multi-word-component-names': 'off',
        'vue/no-v-html': 'error',
        // A label may wrap its control or point to it with `for`; the default demands both.
        'vuejs-accessibility/label-has-for': ['error', { required: { some: ['nesting', 'id'] } }],
        ...Object.fromEntries(shadcnRules.map(rule => [`shadcn/${rule}`, level])),
      },
    },
    {
      // UI parts get their label from the block that uses them (<UiLabel for>).
      files: ['app/components/ui/**/*.vue'],
      rules: {
        'vuejs-accessibility/label-has-for': 'off',
        'vuejs-accessibility/form-control-has-label': 'off',
      },
    },
    ...extra,
  ]
}
