import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const basePath = "/oshamoji";

// https://vitejs.dev/config/
export default defineConfig({
  base: basePath,
  plugins: [react()],
  build: {
    outDir: `../../dist${basePath}`,
  },
});
