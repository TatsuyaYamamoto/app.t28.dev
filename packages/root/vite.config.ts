import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

const basePath = "/";

// https://vitejs.dev/config/
export default defineConfig({
  base: basePath,
  plugins: [
    createHtmlPlugin({
      inject: { ejsOptions: { views: ["../../shared/ejs"] } },
    }),
  ],
  build: {
    outDir: `../../dist${basePath}`,
  },
});
