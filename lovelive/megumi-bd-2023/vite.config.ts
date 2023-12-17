import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const basePath = "/lovelive/megumi-bd-2023";

// https://vitejs.dev/config/
export default defineConfig({
  base: basePath,
  plugins: [vue()],
  build: {
    outDir: `../../dist${basePath}`,
  },
});
