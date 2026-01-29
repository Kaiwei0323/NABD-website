import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    fs: {
      // Prevent Vite from processing files inside .git (e.g. .git/index)
      deny: ['.git']
    }
  }
})
