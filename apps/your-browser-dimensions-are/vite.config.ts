import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const basePath = "/your-browser-dimensions-are";

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
  ],
  build: {
    outDir: `../../dist${basePath}`,
  },
});
