import { AppCalculator } from "./apps/calculator/AppCalculator";
import { AppExample } from "./apps/example/app";
import { AppTicTacToe } from "./apps/tic-tac-toe/AppTicTacToe";
import appsManager from "./entites/core/apps-manager";
import { Layout } from "./features";
import { WindowManager } from "./features/window-manager";
import { ThemeProvider, ThemeProviderToggler } from "./shared/hooks/useTheme";
import { XBtn, XColumn, XMain, XMarkupTable, XTable } from "./shared/ui";
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
				<XMain id="parent_win" className="p-3">
					<XBtn.Group pills color="info">
						<XBtn onClick={onExample}>Exammple</XBtn>
						<XBtn onClick={onCalculator}>Calculator</XBtn>
						<XBtn onClick={onTicTacToe}>TicTacToe</XBtn>
					</XBtn.Group>

					<hr className="my-3" />
					<div className="max-w-5xl m-auto">
						<XTable>
							<XColumn
								field="position"
								header="Element position"
							/>
							<XColumn field="name" header="Element name" />
							<XColumn field="symbol" header="Symbol">
								<XColumn header="Symbol 1" />
								<XColumn header="Symbol 2" />
							</XColumn>
							<XColumn field="mass" header="Atomic mass" />
						</XTable>
						{false && (
							<XMarkupTable border hover rowBorder colBorder>
								<XMarkupTable.Thead>
									<XMarkupTable.Tr>
										<XMarkupTable.Th>
											Element position
										</XMarkupTable.Th>
										<XMarkupTable.Th>
											Element name
										</XMarkupTable.Th>
										<XMarkupTable.Th>
											Symbol
										</XMarkupTable.Th>
										<XMarkupTable.Th>
											Atomic mass
										</XMarkupTable.Th>
									</XMarkupTable.Tr>
								</XMarkupTable.Thead>
								<XMarkupTable.Tbody>
									{elements.map((element) => (
										<XMarkupTable.Tr key={element.name}>
											<XMarkupTable.Td>
												{element.position}
											</XMarkupTable.Td>
											<XMarkupTable.Td>
												{element.name}
											</XMarkupTable.Td>
											<XMarkupTable.Td>
												{element.symbol}
											</XMarkupTable.Td>
											<XMarkupTable.Td>
												{element.mass}
											</XMarkupTable.Td>
										</XMarkupTable.Tr>
									))}
								</XMarkupTable.Tbody>
							</XMarkupTable>
						)}
					</div>
				</XMain>
			</Layout>
		</ThemeProvider>
	);
}
App.displayName = "./App";

export default App;
