import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function blockDotGit() {
  return {
    name: 'block-dot-git',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || ''
        if (url === '/.git' || url.startsWith('/.git/')) {
          res.statusCode = 404
          res.end('Not Found')
          return
        }
        next()
      })
    }
  }
}

// Inside Docker, 127.0.0.1 is the web container itself — use host gateway + published RAG port.
// docker-compose sets RAG_PROXY_TARGET=http://host.docker.internal:8765 for the web service.
const ragProxyTarget =
  process.env.RAG_PROXY_TARGET || process.env.VITE_RAG_PROXY_TARGET || 'http://127.0.0.1:8765'

export default defineConfig({
  plugins: [blockDotGit(), react()],
  server: {
    host: true, // allow external access
    port: 3000,
    proxy: {
      '/developer-rag': {
        target: ragProxyTarget,
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
      deny: ['.git', '.git/**', '**/.git/**']
    }
  }
})
