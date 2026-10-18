import { createHash } from 'node:crypto';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/config.js';
import { LANG_REDIRECT_SCRIPT } from './src/lang-redirect.js';

// Backend del formulari: el navegador només pot connectar-se a aquest origen
// (a més del propi web). Es llegeix de PUBLIC_API_URL en compilar (variable d'entorn
// o fitxer .env, igual que fa ContactForm.jsx); si no hi és, el formulari fa servir
// "/api" (mateix origen) i no cal afegir res.
const apiUrl = process.env.PUBLIC_API_URL || loadEnv('production', process.cwd(), 'PUBLIC_').PUBLIC_API_URL;
const API_ORIGIN = apiUrl ? new URL(apiUrl).origin : null;

// Hash del petit script inline de src/lang-redirect.js (CSP no deixa executar
// scripts inline sense hash).
const hashOf = (code) => `sha256-${createHash('sha256').update(code).digest('base64')}`;

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
  // Política de seguretat de contingut (CSP). Astro calcula sol el hash de cada
  // <script> i <style> que genera i els posa en una etiqueta <meta> de cada pàgina.
  security: {
    csp: {
      algorithm: 'SHA-256',
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "media-src 'self'",
        "font-src https://fonts.gstatic.com",
        `connect-src 'self'${API_ORIGIN ? ` ${API_ORIGIN}` : ''}`,
        "form-action 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        'upgrade-insecure-requests',
      ],
      scriptDirective: {
        resources: ["'self'"],
        hashes: [hashOf(LANG_REDIRECT_SCRIPT)],
      },
      styleDirective: {
        // Google Fonts (full d'estil) + els estils "style={{...}}" de React, que són
        // atributs en línia: només es permeten com a atribut (style-src-attr).
        resources: [
          { resource: "'self'", kind: 'element' },
          { resource: 'https://fonts.googleapis.com', kind: 'element' },
          { resource: "'unsafe-inline'", kind: 'attribute' },
        ],
      },
    },
  },
  // Sense Markdown al web: es desactiva el ressaltat de codi (Shiki), que fa servir
  // estils en línia incompatibles amb la CSP i només generaria un avís en compilar.
  markdown: { syntaxHighlight: false },
  // Permet obrir el servidor de desenvolupament des de GitHub Codespaces
  server: { allowedHosts: ['.app.github.dev'] },
  vite: {
    // En desenvolupament, /api/... es redirigeix al backend de FastAPI
    server: { proxy: { '/api': 'http://localhost:8000' } },
  },
});