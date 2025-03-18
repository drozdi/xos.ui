import { AppCalculator } from "./apps/calculator/AppCalculator";
import { AppExample } from "./apps/example/app";
import { AppTicTacToe } from "./apps/tic-tac-toe/AppTicTacToe";
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
	const onCalculator = () => {
		appsManager.createApp(AppCalculator, {});
	};
	const onTicTacToe = () => {
		appsManager.createApp(AppTicTacToe, {});
	};

	return (
		<ThemeProvider>
			<Layout container overlay toggle view="hhh lpr lff">
				<ThemeProviderToggler slot="header"></ThemeProviderToggler>
				<WindowManager slot="footer"></WindowManager>
				<XMain id="parent_win" className="p-3">
					<XBtn.Group pills color="info">
						<XBtn onClick={onExample}>Exammple</XBtn>
						<XBtn onClick={onCalculator}>Calculator</XBtn>
						<XBtn onClick={onTicTacToe}>TicTacToe</XBtn>
					</XBtn.Group>
					<hr className="my-3" />
					<div className="max-w-4xl m-auto"></div>
				</XMain>
			</Layout>
		</ThemeProvider>
	);
}
App.displayName = "./App";

export default App;
