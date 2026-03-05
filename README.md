# Inventec Website

A modern, responsive website for displaying Inventec industrial computing products.

## Features

- **Header Navigation**: Easy navigation between Home, Product, and Contact pages
- **Product Page**: Displays all products with images and downloadable specifications
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Running with Docker

From the project root (e.g. `NABD-website`):

```bash
docker compose up --build
```

- **Backend (database)**: http://99.64.152.69:3001  
- **Frontend (website)**: http://99.64.152.69:3000  

Stop with `Ctrl+C`. Run in background with `docker compose up -d --build`.

### Serving over HTTPS (https://inventecna.com)

To serve the app at **https://inventecna.com** using SSL keys in the `ssl/` folder, use the included nginx config and build the frontend. See **[README.HTTPS.md](README.HTTPS.md)** for step-by-step instructions (nginx, paths for `ssl/domain.cert.pem` and `ssl/private.key.pem`, and running the backend on port 3001).

**After you change code:** see **[DEPLOY-WORKFLOW.md](DEPLOY-WORKFLOW.md)** for how the setup works and exactly what to run when you change frontend, backend, or nginx.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Project Structure

```
inventec-website/
├── public/
│   ├── Inventec_Logo.jpg
│   └── product/
│       └── [product-name]/
│           ├── image/
│           └── spec/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Header.css
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── Product.jsx
│   │   ├── Product.css
│   │   ├── Contact.jsx
│   │   └── Contact.css
│   ├── utils/
│   │   └── productData.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Adding New Products

To add a new product:

1. Create a folder in `public/product/` with the product name (e.g., `new-product`)
2. Add product images in `public/product/new-product/image/`
3. Add specification PDF in `public/product/new-product/spec/`
4. Update `src/utils/productData.js` to include the new product

## Technologies Used

- React 18
- React Router DOM
- Vite
- CSS3
