import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const basePath = "/lovelive/megumi-bd-2023";

// https://vitejs.dev/config/
export default defineConfig({
  base: basePath,
  assetsInclude: ["**/*.atlas"],
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
  ],
  build: {
    outDir: `../../dist${basePath}`,
  },
});
