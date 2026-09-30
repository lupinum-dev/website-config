export default defineAppConfig({
  ginkoDocs: {
    site: {
      url: 'https://website-config.lupinum.com',
      name: { en: 'Website config' },
      description: { en: 'Shared Vite+ and template ESLint configuration for Lupinum Nuxt websites.' },
      logo: { light: '/icon.svg', dark: '/icon.svg' },
      legalLinks: [
        { label: { en: 'Legal notice' }, to: 'https://lupinum.com/impressum' },
        { label: { en: 'Privacy' }, to: 'https://lupinum.com/datenschutz' },
      ],
    },
    nav: { links: 'auto', socialIcons: true },
    social: { github: 'https://github.com/lupinum-dev/website-config', discord: 'https://discord.gg/RPH6SeA36N' },
    repository: { url: 'https://github.com/lupinum-dev/website-config', branch: 'main', contentDirectory: 'docs/content' },
    analytics: { plausible: { scriptId: '' } },
    feedback: { enabled: true },
    landing: {
      title: { en: 'Website config' },
      description: { en: 'Shared Vite+ and template ESLint configuration for Lupinum Nuxt websites.' },
      primary: { label: { en: 'Get started' }, to: { en: '/docs' } },
      secondary: { label: { en: 'View on GitHub' }, to: { en: 'https://github.com/lupinum-dev/website-config' } },
      install: { command: 'pnpm add @lupinum/website-config' },
    },
  },
})
