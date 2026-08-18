# Namisha, I Love You 💌

A romantic, animated personal website built with React + Vite + Tailwind CSS + Framer Motion.

## Run it in VS Code

1. Unzip this folder and open it in VS Code.
2. Open a terminal in VS Code (Ctrl+` or Cmd+`).
3. Install dependencies:
   ```
   npm install
   ```
4. Start the dev server:
   ```
   npm run dev
   ```
5. Open the URL shown in the terminal (usually http://localhost:5173).

## Build for production

```
npm run build
```

The optimized site will be in the `dist/` folder — you can upload that folder to any static host (Netlify, Vercel, GitHub Pages, etc.).

## Project structure

```
namisha-website/
├── index.html          # Page shell, fonts, and <title>
├── src/
│   ├── main.jsx         # React entry point
│   ├── App.jsx          # Main page component
│   ├── App.css          # Custom theme styles & animations
│   ├── useMusic.js      # Web Audio API background music hook
│   └── index.css        # Tailwind entry
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## Notes

- The photos (portrait + good-morning screenshots) load from the CDN URLs already in the code. If those links ever stop working, swap in your own image URLs or drop images into `public/` and update the paths in `src/App.jsx`.
- Click "play music" in the top-right corner to toggle a soft ambient chord pad, generated live with the Web Audio API (no audio file needed).
