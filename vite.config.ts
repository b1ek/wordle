import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { readFileSync } from 'fs';
import compress from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    compress({
      verbose: true,
      disable: false,
      algorithm: 'brotliCompress',
      ext: '.br',
      filter: () => true
    }),
    compress({
      verbose: true,
      disable: false,
      algorithm: 'gzip',
      ext: '.gz',
      filter: () => true
    }),
    compress({
      verbose: true,
      disable: false,
      algorithm: 'deflate',
      ext: '.zz',
      filter: () => true
    })
  ],
  define: {
    TARGETS: JSON.stringify(readFileSync('targets.csv').toString())
  }
})
