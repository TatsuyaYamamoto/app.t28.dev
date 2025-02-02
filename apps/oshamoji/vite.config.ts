import react from "@vitejs/plugin-react";
import { createAppPaths } from "shared/helpers/createAppPaths";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

const { base, outDir } = createAppPaths(import.meta);

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [
    react(),
    createHtmlPlugin({
      inject: { ejsOptions: { views: ["../../packages/shared/ejs"] } },
    }),
  ],
  build: {
    outDir,
  },
});
