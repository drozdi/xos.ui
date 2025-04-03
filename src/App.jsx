import { useEffect, useRef, useState } from "react";
import "./apps/calculator/core";
import "./apps/example/core";
import "./apps/tic-tac-toe/core";
import appsManager from "./entites/core/apps-manager";
import { Layout } from "./features";
import { WindowManager } from "./features/window-manager";
import { ThemeProvider, ThemeProviderToggler } from "./shared/hooks/useTheme";
import { Box } from "./shared/internal/box";
import { Flex } from "./shared/internal/flex";
import { Unstyled } from "./shared/internal/unstyled";
import { XBadge, XBtn, XIcon, XMain, XPill } from "./shared/ui";
import "./style/index.css";

function App() {
	const ref = useRef(null);
	const [props, setProps] = useState({
		//align: "center",
		//justify: "center",
		//style: { height: 200 },
	});
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
		//console.log(ref);
		setTimeout(() => {
			/*setProps({
				align: "start",
				justify: "start",
				style: { height: 199 },
			}); //*/
			//console.log(props);
		}, 5000);
	}, []);

	return (
		<ThemeProvider>
			{false && (
				<Layout container overlay toggle view="hhh lpr lff">
					<ThemeProviderToggler slot="header"></ThemeProviderToggler>
					<WindowManager slot="footer"></WindowManager>
					<XMain id="parent_win" className="p-3">
						{true && (
							<XBtn.Group pills color="info">
								<XBtn onClick={onExample}>Exammple</XBtn>
								<XBtn onClick={onCalculator}>Calculator</XBtn>
								<XBtn onClick={onTicTacToe}>TicTacToe</XBtn>
							</XBtn.Group>
						)}
						<hr className="my-3" />
						<div className="max-w-4xl m-auto">
							{false && (
								<>
									<XPill.Group size="lg">
										<XPill>asjdghj 1</XPill>
										<XPill>asjdghj 2</XPill>
										<XPill>asjdghj 3</XPill>
									</XPill.Group>

									<XBadge>asjdghj 1</XBadge>
									<XBadge>asjdghj 2</XBadge>
									<XBadge>asjdghj 3</XBadge>
								</>
							)}
							{false && (
								<Flex {...props} ref={ref}>
									<div className="size-36 bg-red-500">
										<div className="size-12 bg-blue-600"></div>
									</div>
								</Flex>
							)}
							{false && (
								<Unstyled ref={ref}>
									<div className="size-36 bg-red-500">
										<div className="size-12 bg-blue-600"></div>
									</div>
								</Unstyled>
							)}
						</div>
					</XMain>
				</Layout>
			)}
			{true && (
				<div className="py-16 w-128 m-auto">
					<Box {...props} className="bg-dark" style={{ height: 200 }}>
						<Box.Section side>
							<XIcon>mdi-home</XIcon>
						</Box.Section>
						<Box.Section className="bg-bgmb5">asdasd</Box.Section>
						<Box.Section className="bg-bgmb3">sdfsdf</Box.Section>
						<Box.Section side>
							<XIcon>mdi-close</XIcon>
						</Box.Section>
					</Box>
				</div>
			)}
		</ThemeProvider>
	);
}
App.displayName = "./App";

export default App;
