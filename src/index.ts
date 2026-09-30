import type { UserConfig } from 'vite-plus'

export interface LupinumViteOptions {
  /** Tailwind v4 entry stylesheet; the formatter reads the theme from it to sort classes. */
  stylesheet?: string
  /** Extra glob patterns that neither the formatter nor the linter touches. */
  ignore?: string[]
  /** Oxlint rules to add or change. They are merged over the defaults. */
  rules?: Record<string, unknown>
  /** Test files for `vp test`. */
  testInclude?: string[]
}

/** Build output and served files that no tool should read. */
const generated = ['.nuxt/**', '.output/**', '.data/**', '.ginko/**', 'public/**']

/**
 * The Vite+ settings for a Lupinum Nuxt site: oxfmt, oxlint and Vitest.
 * Nuxt does not read `vite.config.ts`; it builds from `nuxt.config.ts`.
 */
export function lupinumVite(options: LupinumViteOptions = {}) {
  const ignore = [...generated, ...(options.ignore ?? [])]
  return {
    fmt: {
      // oxfmt only understands CommonMark; MDC components in content/ would be rewritten.
      ignorePatterns: ['content/**', ...ignore],
      sortTailwindcss: {
        stylesheet: options.stylesheet ?? 'app/assets/css/main.css',
        functions: ['cn', 'cva'],
      },
    },
    lint: {
      // Oxlint reads only <script> in .vue files; templates go through lupinumTemplateLint.
      plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'vue', 'import'],
      categories: { correctness: 'error', suspicious: 'warn' },
      rules: { 'eqeqeq': 'error', 'no-console': 'warn', ...options.rules },
      ignorePatterns: ignore,
      // typeCheck stays off: oxlint's type checker cannot resolve `.vue` imports in `.ts` files
      // (shadcn-vue index.ts barrels). vue-tsc checks all types in `nuxt typecheck`.
      options: { typeAware: true },
    },
    test: {
      include: options.testInclude ?? ['app/**/*.test.ts', 'server/**/*.test.ts'],
      environment: 'node',
    },
  } satisfies UserConfig
}
