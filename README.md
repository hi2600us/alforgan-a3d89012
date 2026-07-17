# alforgan.org

Website of وقف الفرقان الخيري ودار النسائية لتحفيظ القران (Alforgan Charitable Endowment), Balqarn, Saudi Arabia.

## Architecture

Plain Vite + React static multi-page app. No server, no framework runtime.

- `site/index.html` + `site/home/` — homepage (prerendered at build time for SEO, hydrates on load)
- `site/recite/` — interactive Quran recitation practice page
- `site/halaqat-interest/` — Quran circles interest registration form (emails admin@alforgan.org via FormSubmit)
- `site/styles.css` — Tailwind 4 theme (design tokens in CSS variables)
- `site/public/` — static files copied to site root (logo, favicon, CNAME, robots.txt, sitemap.xml, 404.html, og-image)
- `scripts/prerender.mjs` — renders the homepage HTML into `dist/index.html` after the client build

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # full production build -> dist/
npm run preview  # preview the production build
```

## Deploy

Push to `main`. GitHub Actions builds from source and deploys `dist/` to GitHub Pages (custom domain: alforgan.org, configured via `site/public/CNAME`).
