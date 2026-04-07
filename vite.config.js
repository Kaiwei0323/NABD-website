import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allow external access
    port: 3000,
    proxy: {
      // Dev: forward to python-rag-service (npm run rag:dev on port 8765)
      '/developer-rag': {
        target: 'http://127.0.0.1:8765',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/developer-rag/, '')
      }
    },
    allowedHosts: [
      'inventecna.com',
      'www.inventecna.com'
    ],
    fs: {
      // Prevent Vite from processing files inside .git (e.g. .git/index)
      deny: ['.git']
    }
  }
})
