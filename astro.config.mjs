// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://dentistanovarataddia.it',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // The whole stylesheet is small: inline it so nothing blocks first paint.
    inlineStylesheets: 'always',
  },
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
