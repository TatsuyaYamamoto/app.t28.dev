import { templateCompilerOptions } from "@tresjs/core";
import vue from "@vitejs/plugin-vue";
import { createAppPaths } from "shared/helpers/createAppPaths";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import vuetify from "vite-plugin-vuetify";

const { base, outDir } = createAppPaths(import.meta);

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [
    vue({
      // https://docs.tresjs.org/guide/getting-started.html#vite
      ...templateCompilerOptions,
    }),
    vuetify(),
    createHtmlPlugin({
      inject: { ejsOptions: { views: ["../../packages/shared/ejs"] } },
    }),
  ],
  build: {
    outDir,
  },
});
