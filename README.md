# React Multipage Demo

This is a minimal multi-page React site built with Vite and Tailwind CSS.

## Quick start

1. Install dependencies:
```
npm install
```

2. Run dev server:
```
npm run dev
```

3. Build:
```
npm run build
```

## Deploy for free

**Vercel**
1. Push this repo to GitHub.
2. Go to vercel.com, import the GitHub repository.
3. Vercel will detect Vite and set `npm run build` as build command and `npm run preview` as preview.
4. Click Deploy — your site will be live on a vercel.app domain.

**Netlify**
1. Push to GitHub.
2. Create a new site from Git in Netlify and connect the repo.
3. In build settings set build command: `npm run build` and publish directory: `dist`.
4. Deploy.

**GitHub Pages**
- For Vite apps, configure GitHub Actions or use the `gh-pages` package. (Netlify/Vercel are simpler.)

## Notes
- This demo includes no backend; contact form is static.
- To use Tailwind in production, ensure purge/content paths in tailwind.config.cjs are correct (already configured).
