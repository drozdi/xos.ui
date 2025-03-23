import { useEffect } from "react";
import "./apps/calculator/core";
import "./apps/example/core";
import "./apps/tic-tac-toe/core";
import appsManager from "./entites/core/apps-manager";
import { Layout } from "./features";
import { WindowManager } from "./features/window-manager";
import { ThemeProvider, ThemeProviderToggler } from "./shared/hooks/useTheme";
import { Flex } from "./shared/internal/flex";
import { XBadge, XBtn, XMain, XPill } from "./shared/ui";
import "./style/index.css";

function App() {
	const onCalculator = () => {
		appsManager.createApp("apps/calculator/app", {});
	};
	const onExample = () => {
		appsManager.createApp("apps/example/app", {});
	};
	const onTicTacToe = () => {
		appsManager.createApp("apps/tic-tac-toe/app", {});
	};
	useEffect(() => {
		appsManager.reloadApps();
	}, []);

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
					<div className="max-w-4xl m-auto">
						<XPill.Group size="lg">
							<XPill>asjdghj 1</XPill>
							<XPill>asjdghj 2</XPill>
							<XPill>asjdghj 3</XPill>
						</XPill.Group>

						<XBadge>asjdghj 1</XBadge>
						<XBadge>asjdghj 2</XBadge>
						<XBadge>asjdghj 3</XBadge>
						<Flex align="center" justify="center">
							<div className="size-36 bg-red-500">
								<div className="size-12 bg-blue-600"></div>
							</div>
						</Flex>
					</div>
				</XMain>
			</Layout>
		</ThemeProvider>
	);
}
App.displayName = "./App";

export default App;
