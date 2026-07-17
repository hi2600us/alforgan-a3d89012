// Unified static build for alforgan.org — three pages, one command.
// Build: npm run build  (output: dist/)
// Prerender of the homepage happens in scripts/prerender.mjs (npm run build runs both).
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  root: path.resolve(__dirname, "site"),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "site") },
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "site/index.html"),
        en: path.resolve(__dirname, "site/en/index.html"),
        recite: path.resolve(__dirname, "site/recite/index.html"),
        halaqat: path.resolve(__dirname, "site/halaqat-interest/index.html"),
      },
    },
  },
  ssr: {
    noExternal: true,
  },
})
