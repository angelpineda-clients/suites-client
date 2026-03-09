import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { AuthProvider } from "./context/auth/AuthProvider.tsx";
import AxiosProvider from "./context/axios/AxiosProvider.tsx";
import { ModalProvider } from "./context/modals/ModalProvider.tsx";
import CustomThemeProvider from "./context/theme/CustomThemeProvider.tsx";
import UiProvider from "./context/ui/UiProvider.tsx";
import Compose from "./utils/Compose.tsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Compose
        components={[AxiosProvider, AuthProvider, CustomThemeProvider, UiProvider, ModalProvider]}
      >
        <App />
      </Compose>
    </BrowserRouter>
  </StrictMode>
);
