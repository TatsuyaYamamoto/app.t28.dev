import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App.tsx";
import { theme } from "../helper/theme";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider resetCSS={true} theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
