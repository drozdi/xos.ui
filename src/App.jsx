import { AppExample } from "./apps/example/app";
import appsManager from "./entites/core/apps-manager";
import { Layout } from "./features";
import { WindowManager } from "./features/window-manager";
import { ThemeProvider, ThemeProviderToggler } from "./shared/hooks/useTheme";
import { XBtn, XMain } from "./shared/ui";
import "./style/index.css";

function App() {
	const onExample = () => {
		appsManager.createApp(AppExample, {});
	};
	return (
		<ThemeProvider>
			<Layout container overlay toggle view="hhh lpr lff">
				<ThemeProviderToggler slot="header"></ThemeProviderToggler>
				<WindowManager slot="footer"></WindowManager>
				<XMain id="parent_win">
					<XBtn onClick={onExample}>Exammple</XBtn>
				</XMain>
			</Layout>
		</ThemeProvider>
	);
}
App.displayName = "./App";

export default App;
