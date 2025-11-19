import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

const basePath = "/diff";

// https://vite.dev/config/
export default defineConfig({
  base: basePath,
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
    createHtmlPlugin({
      inject: { ejsOptions: { views: ["../../packages/shared/ejs"] } },
    }),
  ],
  build: {
    outDir: `../../dist${basePath}`,
  },
});
