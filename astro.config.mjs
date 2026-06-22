import { defineConfig } from "astro/config";
import node from "@astrojs/node";

export default defineConfig({
  site: "https://example.com",
  output: "server",
  adapter: node({ mode: "standalone" }),
  vite: {
    cacheDir: process.env.ASTRO_VITE_CACHE_DIR ?? ".astro/vite-cache",
    resolve: {
      preserveSymlinks: true,
    },
  },
});
