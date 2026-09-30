import { defineGinkoDocsConfig } from '@lupinum/ginko-docs/content'

export default defineGinkoDocsConfig({
  site: {
    name: 'Website config',
    description: 'Shared Vite+ and template ESLint configuration for Lupinum Nuxt websites.',
    whenToUse: 'Use this site to learn and operate Website config.',
  },
  locales: ['en'],
  blog: false,
})
