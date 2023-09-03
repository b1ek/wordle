import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { readFileSync } from 'fs';
import { join } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  define: {
    TARGETS: JSON.stringify(readFileSync('targets.csv').toString())
  }
})
