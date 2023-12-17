import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  // Enable many frameworks to support all different kinds of components.
  integrations: [react()],
  vite: {
    ssr: {
      // https://github.com/withastro/astro/issues/7629#issuecomment-1681239328
      noExternal: ["react-icons"],
    },
  },
});
