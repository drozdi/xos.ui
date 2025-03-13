import { AppCalculator } from "./apps/calculator/AppCalculator";
import { AppExample } from "./apps/example/app";
import { AppTicTacToe } from "./apps/tic-tac-toe/AppTicTacToe";
import appsManager from "./entites/core/apps-manager";
import { Layout } from "./features";
import { WindowManager } from "./features/window-manager";
import { ThemeProvider, ThemeProviderToggler } from "./shared/hooks/useTheme";
import { XBtn, XMain, XTable } from "./shared/ui";
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

	const elements = [
		{ position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
		{ position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
		{ position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
		{ position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
		{ position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
	];

	return (
		<ThemeProvider>
			<Layout container overlay toggle view="hhh lpr lff">
				<ThemeProviderToggler slot="header"></ThemeProviderToggler>
				<WindowManager slot="footer"></WindowManager>
				<XMain id="parent_win">
					<XBtn onClick={onExample}>Exammple</XBtn>
					<XBtn onClick={onCalculator}>Calculator</XBtn>
					<XBtn onClick={onTicTacToe}>TicTacToe</XBtn>
					<hr className="my-3" />
					<div className="max-w-5xl m-auto">
						<XTable border hover striped rowBorder>
							<XTable.Thead>
								<XTable.Tr>
									<XTable.Th>Element position</XTable.Th>
									<XTable.Th>Element name</XTable.Th>
									<XTable.Th>Symbol</XTable.Th>
									<XTable.Th>Atomic mass</XTable.Th>
								</XTable.Tr>
							</XTable.Thead>
							<XTable.Tbody>
								{elements.map((element) => (
									<XTable.Tr key={element.name}>
										<XTable.Td>
											{element.position}
										</XTable.Td>
										<XTable.Td>{element.name}</XTable.Td>
										<XTable.Td>{element.symbol}</XTable.Td>
										<XTable.Td>{element.mass}</XTable.Td>
									</XTable.Tr>
								))}
							</XTable.Tbody>
						</XTable>
					</div>
				</XMain>
			</Layout>
		</ThemeProvider>
	);
}
App.displayName = "./App";

export default App;
