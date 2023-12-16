import { resolve } from "node:path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ViteEjsPlugin } from "vite-plugin-ejs";

export default defineConfig({
  root: resolve(__dirname, "src"),
  plugins: [react(), ViteEjsPlugin()],
  build: {
    outDir: resolve(__dirname, "dist"),
    // (!) outDir /Users/tatsuya.yamamoto/workspace/projects/TatsuyaYamamoto/app.t28.dev/dist is not inside project root and will not be emptied.
    // Use --emptyOutDir to override.
    emptyOutDir: true,
    rollupOptions: {
      input: {
        oshamoji: resolve(__dirname, "src/oshamoji/index.html"),
        oshibana: resolve(__dirname, "src/oshibana/index.html"),
      },
    },
  },
});
