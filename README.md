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
