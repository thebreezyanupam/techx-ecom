import { defineConfig } from 'vite'

export default defineConfig({
  root: './client',
  server: {
    port: 3000
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
})