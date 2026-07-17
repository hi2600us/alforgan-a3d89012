// Prerender the homepage into dist/index.html for SEO/first-paint,
// then the client hydrates (see site/home/main.tsx).
import { build } from "vite";
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.dirname(fileURLToPath(import.meta.url)) + "/..";

// 1) SSR-build the prerender entry
await build({
  configFile: root + "/vite.config.ts",
  build: {
    ssr: root + "/site/home/prerender-entry.tsx",
    outDir: root + "/.prerender",
    emptyOutDir: true,
  },
});

// 2) Render and inject
const { render } = await import(pathToFileURL(root + "/.prerender/prerender-entry.js").href);
const appHtml = render();
const indexPath = root + "/dist/index.html";
let html = readFileSync(indexPath, "utf-8");
if (!html.includes('<div id="root"></div>')) {
  throw new Error("root placeholder not found in dist/index.html");
}
html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
writeFileSync(indexPath, html);
rmSync(root + "/.prerender", { recursive: true, force: true });
console.log(`Prerendered homepage: injected ${appHtml.length} chars`);
