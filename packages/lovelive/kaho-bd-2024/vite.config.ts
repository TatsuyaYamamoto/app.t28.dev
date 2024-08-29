import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createHtmlPlugin } from "vite-plugin-html";
import vuetify from "vite-plugin-vuetify";

const basePath = "/lovelive/kaho-bd-2024";

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
    vuetify(),
    createHtmlPlugin({
      inject: { ejsOptions: { views: ["../../shared/ejs"] } },
    }),
  ],
  build: {
    outDir: `../../../dist${basePath}`,
  },
});
