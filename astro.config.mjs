import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://example.com",
  vite: {
    cacheDir: ".astro/vite-cache",
    resolve: {
      preserveSymlinks: true,
    },
  },
});
