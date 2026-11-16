import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';

// O endereço final do site vem do arquivo de dados (campo siteUrl).
const dados = JSON.parse(readFileSync(new URL('./src/data/profissional.json', import.meta.url), 'utf8'));
const site = dados.siteUrl || 'https://seu-dominio.com.br';

export default defineConfig({
  site,
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
});
