/**
 * API base URL for auth and download endpoints.
 * - VITE_API_URL env overrides.
 * - When on default HTTPS port (443) or no port, use same origin /api (nginx proxies to backend).
 * - Otherwise same host on port 3001 (e.g. inventecna.com:3000 -> inventecna.com:3001).
 */
export function getApiUrl() {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL
  if (typeof window !== 'undefined' && window.location?.hostname) {
    const { protocol, hostname, port } = window.location
    const isDefaultPort = port === '' || port === '443' || port === '80'
    const base = `${protocol}//${hostname}${isDefaultPort ? '' : ':' + port}`
    return isDefaultPort ? `${base}/api` : `${protocol}//${hostname}:3001/api`
  }
  return 'http://localhost:3001/api'
}
