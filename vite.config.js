import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allow external access
    port: 3000,
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
