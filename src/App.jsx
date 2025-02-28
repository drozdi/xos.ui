import { useRef, useState } from "react";
import { routers } from "./apps/example";
import { AppProvider } from "./features/app";
import { XWindow } from "./features/window";
import { WindowManager } from "./features/window-manager";
import { ThemeProviderToggler } from "./shared/hooks/useTheme";
import {
	XIcon,
	XItem,
	XItemLabel,
	XItemSection,
	XLayout,
	XList,
} from "./shared/ui";
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
					default: (props) => {
						return (
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
						);
					},
				}}
			</XLayout>
		</AppProvider>
	);
}

export default App;
