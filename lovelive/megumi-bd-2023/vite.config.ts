import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createHtmlPlugin } from "vite-plugin-html";

const basePath = "/lovelive/megumi-bd-2023";

// https://vitejs.dev/config/
export default defineConfig({
  base: basePath,
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // https://docs.tresjs.org/guide/getting-started.html#vite
          isCustomElement: (tag) =>
            tag.startsWith("Tres") && tag !== "TresCanvas",
        },
      },
    }),
    createHtmlPlugin({
      inject: { ejsOptions: { views: ["../../shared/ejs"] } },
    }),
  ],
  build: {
    outDir: `../../dist${basePath}`,
  },
});
