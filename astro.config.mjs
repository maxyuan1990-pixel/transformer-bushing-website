import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://example.com",
  vite: {
    cacheDir: process.env.ASTRO_VITE_CACHE_DIR ?? ".astro/vite-cache",
    resolve: {
      preserveSymlinks: true,
    },
  },
});
