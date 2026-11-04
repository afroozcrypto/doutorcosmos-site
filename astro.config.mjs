import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Produção: https://doutorcosmos.pt (por ligar). Pré-visualização no GitHub Pages:
// SITE_URL=https://afroozcrypto.github.io BASE_PATH=/doutorcosmos-site PUBLIC_ENV=preview
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://doutorcosmos.pt',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
  // Scripts sempre em ficheiro (/_astro/*.js), nunca inline: o CSP só permite script-src 'self'.
  vite: { build: { assetsInlineLimit: 0 } },
  // Rascunhos com noindex ficam fora do sitemap.
  integrations: [sitemap({ filter: (page) => !page.includes('/ouve-o-universo/') })],
});
