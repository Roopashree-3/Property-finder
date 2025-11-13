Sure! Here's a **single-file ready `README.md`** you can directly copy-paste into your project root:

```markdown
# Property Finder

A modern **Next.js** web application for discovering and viewing properties on a map. Users can explore apartments, houses, penthouses, and rooms, view property details, and track recently viewed listings.  

---

## 🚀 Features

- Dynamic property listing with filters.
- Individual property pages with detailed descriptions and images.
- Interactive **Leaflet map** showing property locations.
- Last viewed properties stored in **sessionStorage**.
- SSR (Server-Side Rendering) for SEO-friendly pages.
- Fully responsive design for mobile and desktop.

---

## 🖥 Tech Stack

- **Next.js 16.0.2** – React framework with SSR support
- **React** – Frontend UI
- **Leaflet & react-leaflet** – Interactive maps
- **JavaScript (ES6+)**
- **CSS / Leaflet CSS**
- **Vercel** – Deployment platform

---

## 📁 Project Structure

```

.
├── components/
│   └── map.jsx          # Leaflet map component
├── data/
│   └── properties.js    # Sample property data
├── pages/
│   ├── index.js         # Homepage
│   ├── map.js           # Map page
│   └── property/
│       └── [id].js      # Dynamic property pages
├── public/
│   └── photos/          # Sample images
├── styles/
│   └── globals.css      # Global styles
├── package.json
└── next.config.js

````

---

## ⚡ Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- Git

### Install Dependencies

```bash
git clone https://github.com/Roopashree-3/Property-finder.git
cd Property-finder
npm install
````

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠 Build & Deployment

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy on Vercel

1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com/) → New Project → Import GitHub Repo.
3. Set **Root Directory** to `./` and **Framework Preset** to `Next.js`.
4. Add your custom domain if needed.
5. Click **Deploy**.

---

## ⚙️ Environment Variables

> Currently, no environment variables are required. For future API integration, create a `.env.local` file at the project root.

---


## ✨ Contributions

Feel free to submit issues or pull requests!
Fork the repository → make changes → create a Pull Request.

---

## 📄 License

MIT License © 2025 Roopashree

```


