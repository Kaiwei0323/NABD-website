# Frontend (Vite dev server) - build from repo root
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# --host 0.0.0.0 so Vite is reachable from host at 99.64.152.69:3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
