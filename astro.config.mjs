import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Domínio de produção previsto. Sem deploy nesta versão.
export default defineConfig({
  site: 'https://doutorcosmos.pt',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
  integrations: [sitemap()],
});
