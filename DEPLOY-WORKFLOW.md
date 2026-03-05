# How inventecna.com Works & How to Redeploy After Changes

## How It Works (Overview)

```
User browser
    ↓
https://inventecna.com (HTTPS, port 443)
    ↓
Nginx (on the server)
    ├── /          → serves static files from  dist/  (your built React app)
    └── /api/*     → proxies to  http://127.0.0.1:3001  (Node backend in Docker)
                         ↓
                    Docker container (nabd-website_server_1)
                    - Runs Node/Express on port 3001
                    - Reads/writes  server/database/users.json  (login, users)
                    - Serves PDFs from  public/  (watermarks)
```

- **Frontend**: Built once with `npm run build` → output in `dist/`. Nginx serves those files; no separate “frontend server” at runtime.
- **Backend**: Runs in Docker (`nabd-website_server_1`), listens on port 3001. Nginx sends all `https://inventecna.com/api/*` requests to it.
- **API URL**: The app is built with `VITE_API_URL=https://inventecna.com/api` (in `.env`), so the browser calls the same domain; no mixed content, and everything goes through Nginx.

So: **Nginx** = HTTPS + static files + reverse proxy. **Docker** = only the API/database process.

---

## What We Fixed for Login

1. **Backend had to be running**  
   Login uses the API. If nothing is listening on port 3001, login fails. We run the backend in Docker so it’s always there.

2. **API URL had to match the site**  
   The built app was calling `http://99.64.152.69:3001/api`. From `https://inventecna.com` that’s mixed content (HTTPS → HTTP) and can be blocked. We set `VITE_API_URL=https://inventecna.com/api` in `.env` and rebuilt so the app calls the same origin; Nginx then proxies `/api` to the Docker container.

3. **Nginx and Docker**  
   Nginx serves the site and proxies `/api` to `127.0.0.1:3001`. The Docker container publishes port 3001 to the host, so Nginx can reach it.

---

## When You Change Code: How to Rerun / Redeploy

### 1. You change **frontend** code (e.g. `src/`, `index.html`, CSS, `vite.config.js`)

- Rebuild the app and let Nginx keep serving the new `dist/`:

```bash
cd ~/Documents/NABD-website
npm install          # only if you added/updated npm packages
npm run build
```

- No need to restart Nginx or Docker. Reload the site in the browser (hard refresh: Ctrl+Shift+R or Cmd+Shift+R).

---

### 2. You change **backend** code (e.g. `server/index.js`, `server/package.json`)

- Rebuild and restart the API container so it runs the new code:

```bash
cd ~/Documents/NABD-website
docker compose up -d --build server
```

- Or with older Compose: `docker-compose up -d --build server`
- No need to touch Nginx or the frontend. Try login or any API again.

---

### 3. You change **Nginx** config (e.g. `nginx-inventecna.conf`)

- Copy the updated config into Nginx, test, then reload:

```bash
sudo cp ~/Documents/NABD-website/nginx-inventecna.conf /etc/nginx/sites-available/inventecna
sudo nginx -t
sudo systemctl reload nginx
```

- Fix paths in the config if your project path is different (e.g. replace `/home/inventec/...` with your path).

---

### 4. You change **API URL** or **environment** (e.g. `.env` for frontend)

- If you edit `.env` (e.g. `VITE_API_URL`), you must **rebuild the frontend** so the new value is baked in:

```bash
cd ~/Documents/NABD-website
npm run build
```

- Then refresh the site. Backend and Nginx don’t need a restart for that.

---

### 5. You change **SSL** certs (e.g. new files in `ssl/`)

- Update paths in `/etc/nginx/sites-available/inventecna` if the cert/key names or paths changed, then:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## Quick Reference

| What changed              | What to run                                                |
|---------------------------|------------------------------------------------------------|
| Frontend (React, UI, env) | `npm run build`                                            |
| Backend (server code)     | `docker compose up -d --build server` (or `docker-compose`) |
| Nginx config              | Copy to `sites-available`, then `nginx -t` and `reload`   |
| SSL certs                 | Edit Nginx config, then `nginx -t` and `reload`            |

---

## One-time / Rare Commands

- **Start API (Docker)**: `docker compose up -d server` (or `docker-compose up -d server`)
- **Stop API**: `docker compose stop server`
- **See API logs**: `docker compose logs -f server`
- **Check Nginx**: `sudo nginx -t && sudo systemctl status nginx`
- **Check API health**: `curl -s https://inventecna.com/api/health`
