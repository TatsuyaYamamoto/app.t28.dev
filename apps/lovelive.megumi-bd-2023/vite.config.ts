import { templateCompilerOptions } from "@tresjs/core";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

const basePath = "/lovelive/megumi-bd-2023";

// https://vitejs.dev/config/
export default defineConfig({
  base: basePath,
  plugins: [
    vue({
      // https://docs.tresjs.org/guide/getting-started.html#vite
      ...templateCompilerOptions,
    }),
    createHtmlPlugin({
      inject: { ejsOptions: { views: ["../../packages/shared/ejs"] } },
    }),
  ],
  build: {
    outDir: `../../dist${basePath}`,
  },
});
