import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { AgentProvider } from "./components/AgentProvider.tsx";

import "./index.css";

const customConfig = defineConfig({
  globalCss: {
    html: {
      // https://www.chakra-ui.com/guides/theming-change-default-color-palette
      colorPalette: "blue",
    },
  },
});

const system = createSystem(defaultConfig, customConfig);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <AgentProvider>
        <App />
      </AgentProvider>
    </ChakraProvider>
  </StrictMode>,
);
