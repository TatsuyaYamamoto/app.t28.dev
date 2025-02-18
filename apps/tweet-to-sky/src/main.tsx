import { Provider } from "@/components/ui/provider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { AgentProvider } from "./components/AgentProvider.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <AgentProvider>
        <App />
      </AgentProvider>
    </Provider>
  </StrictMode>,
);
