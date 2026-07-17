// Standalone build for the /recite page.
// Builds standalone-recite/ into dist-static/recite/ so GitHub Pages serves it
// at https://alforgan.org/recite/ alongside the existing static homepage.
// Usage: npx vite build --config vite.recite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  root: path.resolve(__dirname, "standalone-recite"),
  base: "/recite/",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: path.resolve(__dirname, "dist-static/recite"),
    emptyOutDir: true,
  },
});
