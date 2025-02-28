import { Route, Routes } from "react-router-dom";
import { routers } from "../example";
import { AppProvider } from "./components/app";
import { XIcon, XItem, XItemLabel, XItemSection, XList } from "./components/ui";
import { XLayout } from "./components/ui/layout";
import { ThemeProvider } from "./hooks/useTheme";

function App() {
	return (
		<AppProvider config={{ smKey: "app-1" }}>
			<XLayout
				container={true}
				overlay={true}
				toggle={true}
				view="lhr lpr lff"
			>
				{{
					left: (props) => {
						//return "left";
						return (
							<XList separator>
								{routers.map((item, index) => (
									<XItem key={index} to={item.path}>
										<XItemSection side>
											<XIcon>{item.icon}</XIcon>
										</XItemSection>
										<XItemSection>
											<XItemLabel lines>
												{item.label}
											</XItemLabel>
										</XItemSection>
									</XItem>
								))}
							</XList>
						);
					},
					header: <ThemeProvider.Toggler></ThemeProvider.Toggler>,
					footer: "footer",
					//right: 'right',
					default: (props) => (
						<Routes>
							{routers.map((item, index) => (
								<Route
									key={index}
									path={item.path}
									element={item.element}
								/>
							))}
						</Routes>
					),
				}}
			</XLayout>
		</AppProvider>
	);
}

export default App;
