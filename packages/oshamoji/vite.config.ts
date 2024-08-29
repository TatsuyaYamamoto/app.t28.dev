import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";

const basePath = "/oshamoji";

// https://vitejs.dev/config/
export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    createHtmlPlugin({
      inject: { ejsOptions: { views: ["../shared/ejs"] } },
    }),
  ],
  build: {
    outDir: `../../dist${basePath}`,
  },
});
