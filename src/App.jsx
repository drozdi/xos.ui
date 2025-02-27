import { useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AppProvider } from "./components/app";
import { WindowManager } from "./components/apps/window-manager";
import { routers } from "./components/example";
import { ThemeProviderToggler } from "./components/hooks/useTheme";
import {
	XIcon,
	XItem,
	XItemLabel,
	XItemSection,
	XLayout,
	XList,
	XWindow,
} from "./components/ui";
import "./style/index.css";

function App() {
	const [view, setView] = useState();
	const [path, setPath] = useState();
	const win = useRef();
	/*useEffect(() => {
		console.log(win);
	}, [win]);*/
	return (
		<AppProvider smKey="core">
			<XLayout container overlay toggle view="lhr lpr lff">
				{{
					header: <ThemeProviderToggler></ThemeProviderToggler>,
					footer: () => <WindowManager></WindowManager>,
					default: (props) => (
						<AppProvider smKey="app-1">
							<XWindow title="Title" ref={win}>
								<XLayout
									container
									overlay
									toggle
									view="lhr lpr lff"
								>
									{{
										left: (props) => {
											return (
												<XList separator>
													{routers.map(
														(item, index) => (
															<XItem
																key={index}
																onClick={() => {
																	setView(
																		item.element
																	);
																	setPath(
																		item.path
																	);
																}}
																active={
																	item.path ===
																	path
																}
															>
																<XItemSection
																	side
																>
																	<XIcon>
																		{
																			item.icon
																		}
																	</XIcon>
																</XItemSection>
																<XItemSection>
																	<XItemLabel
																		lines
																	>
																		{
																			item.label
																		}
																	</XItemLabel>
																</XItemSection>
															</XItem>
														)
													)}
												</XList>
											);
										},
										default: (props) => view,
									}}
								</XLayout>
							</XWindow>
						</AppProvider>
					),
				}}
			</XLayout>
		</AppProvider>
	);
	return (
		<AppProvider config={{ smKey: "app-1" }}>
			<XLayout container overlay toggle view="lhr lpr lff">
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
					header: <ThemeProviderToggler></ThemeProviderToggler>,
					//header: "header",
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
