# Inventec Website

A modern, responsive website for displaying Inventec industrial computing products, with user roles (admin, customer, guest), login, and an admin Permission page for role and user management.

## Features

- **Header Navigation**: Home, Product, Developer, Resource, Contact
- **Product Page**: Products with images and downloadable specifications (role-based)
- **Login / Register**: User accounts stored in backend (JSON database)
- **Permission (Admin)**: Admin users can change other users’ roles and delete users
- **Responsive Design**: Works on desktop, tablet, and mobile
- **HTTPS**: Optional production setup with nginx and SSL

## Prerequisites

- **Local testing**: Node.js (v16+), npm
- **Production with Docker**: Node.js, npm, Docker and Docker Compose, nginx (for HTTPS)
- **SSL (optional)**: Certificate and private key in project `ssl/` folder (e.g. `domain.cert.pem`, `private.key.pem`)

---

## 1. Local deployment (testing – website and database)

Use this to run the **website** and **database/API** on your machine for development and testing.

### Option A: Run website and backend separately (no Docker)

**Terminal 1 – Backend (database API on port 3001):**

```bash
cd server
npm install
npm run dev
```

Leave this running. You should see: `Server is running on http://0.0.0.0:3001`.

**First-time login (empty user database):** On startup, if `server/database/users.json` has **no users**, the server seeds a default **admin** account: username **`admin@inventec.com`**, password **`admin123`**. Change this in production via **`DEFAULT_ADMIN_USERNAME`**, **`DEFAULT_ADMIN_PASSWORD`**, or disable seeding with **`SKIP_DEFAULT_ADMIN_SEED=true`**. After a restart with an **empty** `[]` database, the seed runs once; if you already have users, nothing is added.

**Terminal 2 – Frontend (website on port 3000):**

```bash
# From project root
npm install
npm run dev
```

Then open **http://localhost:3000**. The app will call the API at **http://localhost:3001/api** (no `.env` needed for this).

### Option B: Run both with Docker (website + database in containers)

From the **project root**:

```bash
docker compose up -d --build
```

- **Website**: http://localhost:3000 (Vite dev server in container)
- **API**: http://localhost:3001 (Node backend in container; database in `./server/database`)

Stop: `docker compose down`.  
To run only the backend in Docker: `docker compose up -d --build server`.

### Docker: build images

Use this when you want to **compile Docker images** only, or to **rebuild** after Dockerfile or dependency changes.

**Build with Docker Compose** (from the **project root**):

```bash
# Default services: server + web
docker compose build

# One service
docker compose build server
docker compose build web

# RAG (GPU) — profile required
docker compose --profile rag build rag

# RAG (CPU)
docker compose --profile rag-cpu build rag-cpu

# Clean rebuild (ignore cache)
docker compose build --no-cache
docker compose build --no-cache server
```

**Build and start containers** (same as Option B, but forces a rebuild):

```bash
docker compose up -d --build
docker compose --profile rag up -d --build server web rag
```

**Plain `docker build`** (without Compose), from the **project root**:

| Image        | Command |
|-------------|---------|
| API server  | `docker build -f server/Dockerfile -t inventec-server:latest .` |
| Vite / web  | `docker build -f Dockerfile -t inventec-web:latest .` |
| RAG (CPU)   | `docker build -f python-rag-service/Dockerfile -t inventec-rag-cpu:latest python-rag-service` |
| RAG (GPU)   | `docker build -f python-rag-service/Dockerfile.gpu -t inventec-rag-gpu:latest python-rag-service` |

**Production frontend (`dist/`):** This repo’s **`web`** Docker image runs the **Vite dev server**, not a static export. For production, run **`npm install`** and **`npm run build`** on the host (or in any Node environment), then deploy **`dist/`** with nginx and run the API with Docker (§2).

---

## 2. Production – host website and server (Docker)

Use this to run the **backend in Docker** and serve the **built website** (e.g. with nginx). The database stays in `./server/database` on the host via a volume.

### 2.1 Build the frontend

On the machine where you deploy (or locally, then copy `dist/`):

```bash
npm install
npm run build
```

This creates the **dist/** folder (static site). You will serve this with nginx (or any static file server).

### 2.2 Run the backend (database/API) in Docker

On the **same server** that will serve the site:

```bash
docker compose up -d --build server
```

- The API listens on **port 3001**.
- User data is in **./server/database** on the host (bind-mounted).
- Health check: `curl -s http://localhost:3001/api/health`

### 2.3 Serve the website

- **Option 1 – nginx (recommended for HTTPS)**  
  - Point nginx `root` to your **dist/** folder.  
  - Proxy **/api/** to **http://127.0.0.1:3001**.  
  - Use the included **nginx-inventecna.conf** as a template; set `root` to your `dist/` path and fix SSL paths if you use HTTPS.

- **Option 2 – Other**  
  Serve the contents of **dist/** with any static server (e.g. Apache, or `npx serve -s dist -l 3000`). Ensure the frontend can reach the API (same host or set **VITE_API_URL** before building).

### 2.4 Production API URL (for login to work)

If the site is served at **https://yourdomain.com** and nginx proxies **/api** to the Docker backend:

- In project root, set in **.env** (before building):  
  `VITE_API_URL=https://yourdomain.com/api`
- Run **npm run build** again so the built app uses this URL.

---

## 3. Quick reference – what to run when

| Goal                         | Command |
|-----------------------------|--------|
| Local: frontend + backend   | Two terminals: `cd server && npm run dev` and `npm run dev` (root) |
| Local: both in Docker       | `docker compose up -d --build` |
| Docker: build images only   | `docker compose build` (or `docker compose build server`) |
| Production: backend only   | `docker compose up -d --build server` |
| After frontend code change  | `npm run build` (and redeploy `dist/` if needed) |
| After backend code change   | `docker compose up -d --build server` |
| Local: RAG chat assistant   | `conda activate nemotron-rag`, then `npm run rag:dev` (see §6) |
| Docker: RAG service (GPU)   | `docker compose --profile rag up -d --build rag` (see §6.5) |
| Docker: RAG service (CPU)   | `docker compose --profile rag-cpu up -d --build rag-cpu` (see §6.5) |

---

## 4. Project structure (main parts)

```
NABD-website/
├── public/           # Static assets, product images/PDFs
├── src/              # React app (pages, components, context, utils)
├── server/           # Node API (Express), database in server/database/users.json
├── python-rag-service/  # FastAPI RAG API, Dockerfile / Dockerfile.gpu (optional; see README §6)
├── dist/             # Built frontend (after npm run build) – do not commit
├── ssl/              # SSL cert/key for HTTPS (do not commit; in .gitignore)
├── docker-compose.yml
├── Dockerfile        # Frontend container (Vite dev)
├── server/Dockerfile # Backend container
└── nginx-inventecna.conf  # Example nginx config for HTTPS
```

---

## 5. Adding new products

1. Add a folder under **public/product/** (e.g. `new-product`).
2. Add images in **public/product/new-product/image/** and PDFs in **spec/**.
3. Register the product in **src/utils/productData.js**.

---

## 6. Developer RAG service (optional chat assistant)

The **python-rag-service** powers the floating “Ask a question” assistant on Developer pages. It uses local embedding/rerank models and an NVIDIA LLM via **NVIDIA_API_KEY**.

### 6.1 Conda environment

From the **project root**:

```bash
conda env create -f python-rag-service/environment.yml
conda activate nemotron-rag
```

### 6.2 Install PyTorch

Run **one** of the following inside the activated `nemotron-rag` environment.

**CPU**

```bash
pip install torch
```

**GPU (CUDA 12.x — PyTorch wheels for CUDA 12.1)**

```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
```

Use a GPU build that matches your installed NVIDIA driver/CUDA runtime; see [PyTorch Get Started](https://pytorch.org/get-started/locally/) if you need a different CUDA version.

### 6.3 Remaining Python dependencies

Still in `nemotron-rag`, from **python-rag-service**:

```bash
cd python-rag-service
pip install -r requirements.txt
```

### 6.4 API key and run

1. Copy **python-rag-service/.env.example** to **python-rag-service/.env** and set **NVIDIA_API_KEY**.
2. Start the service (port **8765** by default):

```bash
# From project root
npm run rag:dev
```

Or manually:

```bash
cd python-rag-service
python -m uvicorn main:app --host 0.0.0.0 --port 8765 --reload
```

For local Vite dev, **/developer-rag** is proxied to this service. If you use **Express on port 3001** with the built site, **/developer-rag** is proxied there as well (see **server** config). Set **RAG_SERVICE_URL** if the RAG service runs on another host/port.

### 6.5 Run the RAG service with Docker

This matches the same stack as a local install (PyTorch + **requirements.txt** + uvicorn on **8765**), without conda on the host.

**Prerequisites**

1. [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/) v2+.
2. A **python-rag-service/.env** file with **NVIDIA_API_KEY** (copy from **python-rag-service/.env.example**). Compose loads this file for the RAG containers.
3. **Profile `rag` (GPU):** [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html) on the host so Docker can use your GPU.

**GPU (default `rag` service — CUDA 12.1 in the image)**

From the **project root**:

```bash
docker compose --profile rag up -d --build rag
```

Full stack (website + API + RAG on GPU):

```bash
docker compose --profile rag up -d --build server web rag
```

Set **`RAG_SERVICE_URL=http://rag:8765`** in the **project root** `.env` when **server** and **rag** run together in Compose.

**CPU only (no GPU)**

Use the **`rag-cpu`** service. Do **not** run **`rag`** and **`rag-cpu`** at once (both use port **8765**).

```bash
docker compose --profile rag-cpu up -d --build rag-cpu
```

**Check health**

```bash
curl -s http://localhost:8765/api/health
```

`rag_ready` should be `true` after models finish loading (first start can take several minutes while weights download).

**Build only the image (optional)**

```bash
docker build -t inventec-rag:cpu -f python-rag-service/Dockerfile python-rag-service
docker build -t inventec-rag:gpu -f python-rag-service/Dockerfile.gpu python-rag-service
docker run --rm -p 8765:8765 --env-file python-rag-service/.env inventec-rag:cpu
```

For **GPU** with plain `docker run`, pass GPU flags, for example:

```bash
docker run --rm -p 8765:8765 --env-file python-rag-service/.env --gpus all inventec-rag:gpu
```

**Node server + Docker RAG**

- **Server in Docker, RAG on the host** (e.g. `npm run rag:dev` on port 8765): the Compose **server** service defaults to **RAG_SERVICE_URL=http://host.docker.internal:8765** (with `extra_hosts: host-gateway` for Linux). No change needed on Docker Desktop for Windows/macOS in most cases.
- **Server and RAG both in Docker:** set **`RAG_SERVICE_URL=http://rag:8765`** in the **project root** `.env`, then use the full-stack command above (`server web rag`).

Hugging Face model weights are cached in the **rag_hf_cache** Docker volume so restarts are faster.

**If login or the chat fails in Docker**

- **Chat “something went wrong”:** The Vite app in the **web** container must proxy `/developer-rag` to a reachable RAG service. Compose sets **`RAG_PROXY_TARGET=http://host.docker.internal:8765`** so traffic goes to port **8765** on the host (where the **rag** container publishes it). Restart the **web** container after changing Compose. Ensure the **rag** (or **rag-cpu**) service is running and healthy (`curl http://localhost:8765/api/health`).
- **Login / API errors:** The browser calls **`http://<same-host>:3001/api`**. Open port **3001** on the host firewall. If you use **`127.0.0.1`** or a **LAN IP** (e.g. `192.168.x.x`) to open the site, CORS is allowed for those dev origins. For a custom domain, add it to **`server/index.js`** `isAllowedCorsOrigin` or set **`VITE_API_URL`** before build.

---

## 7. Technologies

- React 18, React Router, Vite
- Node.js, Express (backend)
- Docker, Docker Compose (optional, for local and production)
- nginx (optional, for production HTTPS)
- Python FastAPI, PyTorch, LangChain, FAISS (optional RAG service in **python-rag-service/**)
