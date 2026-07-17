# alforgan.org

Website of وقف الفرقان الخيري ودار النسائية لتحفيظ القران (Alforgan Charitable Endowment), Balqarn, Saudi Arabia.

## How it works

Plain static HTML — no build step, no dependencies. What's in this repo is exactly what's served.

| File / folder | What it is |
|---|---|
| `index.html` | Homepage (Arabic) |
| `en/index.html` | Homepage (English) |
| `recite/index.html` | Interactive Quran recitation practice (speech recognition, self-contained) |
| `halaqat-interest/index.html` | Quran circles registration form (emails admin@alforgan.org via FormSubmit) |
| `404.html` | Not-found page |
| `assets/` | Compiled stylesheet + photos |
| `logo.png`, `favicon.png`, `og-image.jpg` | Brand images |
| `CNAME`, `robots.txt`, `sitemap.xml` | Domain + search engine config |

## Editing

Edit the HTML files directly and push to `main` — GitHub Actions deploys the repo as-is to GitHub Pages (custom domain: alforgan.org).

Styling uses utility classes compiled into `assets/styles.css`. When adding new elements, reuse classes already present in the HTML; for anything new, add plain CSS to a `<style>` block or to the end of `assets/styles.css`.
