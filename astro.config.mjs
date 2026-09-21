import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/config.js';

export default defineConfig({
  site: SITE_URL,
  integrations: [
    react(),
    // Genera /sitemap-index.xml amb les 4 versions d'idioma enllaçades entre elles
    sitemap({
      i18n: {
        defaultLocale: 'ca',
        locales: { ca: 'ca', es: 'es', en: 'en', fr: 'fr' },
      },
    }),
  ],
  // Permet obrir el servidor de desenvolupament des de GitHub Codespaces
  server: { allowedHosts: ['.app.github.dev'] },
  vite: {
    // En desenvolupament, /api/... es redirigeix al backend de FastAPI
    server: { proxy: { '/api': 'http://localhost:8000' } },
  },
});
