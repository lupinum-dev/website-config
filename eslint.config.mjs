// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

// Lints TypeScript and Vue as well as scripts; works without a Nuxt app.
export default createConfigForNuxt({
  features: { tooling: true, stylistic: true },
}).append({
  // The fixture breaks template rules on purpose; the tests lint it with the package's own config.
  ignores: ['**/dist/**', 'release/**', 'test/fixtures/**'],
})
