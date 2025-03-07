import { AppExample } from "./apps/example/app";
import { Layout } from "./features";
import { WindowManager } from "./features/window-manager";
import { ThemeProviderToggler } from "./shared/hooks/useTheme";
import { XMain } from "./shared/ui";
import "./style/index.css";

function App() {
	return (
		<Layout container overlay toggle view="hhh lpr lff">
			<ThemeProviderToggler slot="header"></ThemeProviderToggler>
			<WindowManager slot="footer"></WindowManager>
			<XMain id="parent_win">
				<AppExample smKey="app-1" />
				<AppExample smKey="app-2" />
			</XMain>
		</Layout>
	);
}

export default App;
