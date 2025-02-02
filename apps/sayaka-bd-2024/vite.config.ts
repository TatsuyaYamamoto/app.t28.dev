import { templateCompilerOptions } from "@tresjs/core";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import vuetify from "vite-plugin-vuetify";

const basePath = "/lovelive/sayaka-bd-2024";

// https://vitejs.dev/config/
export default defineConfig({
  base: basePath,
  plugins: [
    vue({
      // https://docs.tresjs.org/guide/getting-started.html#vite
      ...templateCompilerOptions,
    }),
    vuetify(),
    createHtmlPlugin({
      inject: { ejsOptions: { views: ["../../shared/ejs"] } },
    }),
  ],
  build: {
    outDir: `../../../dist${basePath}`,
  },
});
