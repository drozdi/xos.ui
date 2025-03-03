import "@mdi/font/css/materialdesignicons.min.css";
import "@style";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "./shared/hooks/useTheme";

const app = createRoot(document.getElementById("root"));
console.log(app);
app.render(
	<ThemeProvider>
		<App />
	</ThemeProvider>
);
