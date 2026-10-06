import eslint from '@eslint/js'

export default [
  eslint.configs.recommended,
  { ignores: ['**/dist/**', 'release/**'] },
  {
    files: ['**/*.mjs'],
    languageOptions: { globals: { console: 'readonly', process: 'readonly' } },
  },
]
