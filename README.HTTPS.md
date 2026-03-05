# HTTPS setup for https://inventecna.com

Serve the app at **https://inventecna.com** (port 443) using your SSL keys in the `ssl/` folder.

## 1. SSL files

Ensure these exist under the project’s `ssl/` folder:

- `ssl/domain.cert.pem` – certificate (or full chain)
- `ssl/private.key.pem` – private key

If your cert file has a different name (e.g. `public.key.pem`), update the nginx config paths below.

## 2. Build the frontend

From the project root:

```bash
npm install
npm run build
```

This creates the `dist/` folder used by nginx.

## 3. Nginx configuration

Copy the sample config and fix paths:

```bash
sudo cp nginx-inventecna.conf /etc/nginx/sites-available/inventecna
sudo nano /etc/nginx/sites-available/inventecna
```

Replace **every** `/path/to/NABD-website` with the real project path (e.g. `/home/user/NABD-website` or `/var/www/NABD-website`). Example:

- `ssl_certificate` and `ssl_certificate_key` → e.g. `/home/user/NABD-website/ssl/domain.cert.pem` and `.../ssl/private.key.pem`
- `root` → e.g. `/home/user/NABD-website/dist`

Enable the site and reload nginx:

```bash
sudo ln -sf /etc/nginx/sites-available/inventecna /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 4. Run the backend (required for login)

The API must be listening on **port 3001** on the **same machine as nginx** (nginx proxies `https://inventecna.com/api` to `http://127.0.0.1:3001`). If the backend is not running, login will fail.

**One-time: install dependencies**

```bash
cd /home/inventec/Documents/NABD-website/server
npm install
```

**Option A – run in terminal (stops when you close the session)**

```bash
cd /home/inventec/Documents/NABD-website/server
npm run dev
```

**Option B – run with Docker (keeps running, no Node on host)**

From the project root (same machine as nginx):

```bash
cd /home/inventec/Documents/NABD-website
docker compose up -d --build server
```

This starts only the API container; nginx will proxy `https://inventecna.com/api` to it. Database is stored in `./server/database` on the host. To stop: `docker compose stop server`.

**Option C – run as a systemd service (keeps running after logout)**

```bash
# Copy and edit the example unit (set correct WorkingDirectory if needed)
sudo cp /home/inventec/Documents/NABD-website/server/inventecna-api.service.example /etc/systemd/system/inventecna-api.service
sudo nano /etc/systemd/system/inventecna-api.service   # fix User and WorkingDirectory if needed

sudo systemctl daemon-reload
sudo systemctl enable inventecna-api
sudo systemctl start inventecna-api
sudo systemctl status inventecna-api
```

**Check that the API is reachable**

```bash
curl -s https://inventecna.com/api/health
# Should return: {"status":"ok","message":"Server is running"}
```

## 5. Result

- **https://inventecna.com** → nginx serves the built frontend from `dist/` and proxies `/api` to the Node server on 3001.
- **http://inventecna.com** → redirects to **https://inventecna.com**.

The app uses the same origin for the API when on port 443, so login and PDF downloads work without extra CORS or API URL config.

## Optional: dev server behind HTTPS

To run the Vite dev server but access it via https://inventecna.com, use nginx to proxy `/` to `http://127.0.0.1:3000` instead of serving `dist/`:

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Keep the `/api/` block as-is so the API still goes to port 3001.
