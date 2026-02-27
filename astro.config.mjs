import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import react from '@astrojs/react';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://techedgeindia.co.in',
  output: 'static', // Important for Netlify
  adapter: netlify(),
  integrations: [
    react(),
    icon(),
    sitemap()
  ],
  vite: {
    plugins: [tailwind()]
  }
});