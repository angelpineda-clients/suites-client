import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/auth/AuthProvider.tsx";
import AxiosProvider from "./context/axios/AxiosProvider.tsx";
import Compose from "./utils/Compose.tsx";
import CustomThemeProvider from "./context/theme/CustomThemeProvider.tsx";
import UiProvider from "./context/ui/UiProvider.tsx";
import { ModalProvider } from "./context/modals/ModalProvider.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<Compose
			components={[
				AxiosProvider,
				AuthProvider,
				CustomThemeProvider,
				UiProvider,
				ModalProvider,
			]}
		>
			<App />
		</Compose>
	</BrowserRouter>
);
