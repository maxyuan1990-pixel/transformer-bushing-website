import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://www.qixinghv.com",
  output: "static",
  adapter: vercel(),
  vite: {
    cacheDir: process.env.ASTRO_VITE_CACHE_DIR ?? ".astro/vite-cache",
    resolve: {
      preserveSymlinks: true,
    },
  },
});
