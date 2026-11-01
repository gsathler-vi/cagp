// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  outDir: './dist',
  site: 'https://cagp-ufmg.github.io',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
});
