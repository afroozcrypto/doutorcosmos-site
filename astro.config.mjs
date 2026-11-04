import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Produção: https://doutorcosmos.pt (por ligar). Pré-visualização no GitHub Pages:
// SITE_URL=https://afroozcrypto.github.io BASE_PATH=/doutorcosmos-site PUBLIC_ENV=preview
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://doutorcosmos.pt',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
  integrations: [sitemap()],
});
