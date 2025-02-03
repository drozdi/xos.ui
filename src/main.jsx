import "@mdi/font/css/materialdesignicons.min.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, NavLink } from "react-router-dom";
import App from "./App.jsx";
import { ThemeProvider } from "./components/hooks/useTheme";
import { RenderProvider } from "./components/internal/render";
import "./style/index.css";

createRoot(document.getElementById("root")).render(
	<ThemeProvider>
		<BrowserRouter>
			<RenderProvider render={({ as, to }) => (!!to ? NavLink : as)}>
				<App />
			</RenderProvider>
		</BrowserRouter>
	</ThemeProvider>
);
