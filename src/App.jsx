import { AppExample } from "./apps/example/app";
import { Layout } from "./features";
import { AppProvider } from "./features/app";
import { WindowManager } from "./features/window-manager";
import { ThemeProviderToggler } from "./shared/hooks/useTheme";
import "./style/index.css";

function App() {
	return (
		<>
			<AppProvider smKey="core">
				<Layout container overlay toggle view="hhh lpr lff">
					<ThemeProviderToggler slot="header"></ThemeProviderToggler>
					<WindowManager slot="footer"></WindowManager>
					<>
						<AppExample smKey="app-1" />
						<AppExample smKey="app-2" />
					</>
				</Layout>
			</AppProvider>
		</>
	);
}

export default App;
