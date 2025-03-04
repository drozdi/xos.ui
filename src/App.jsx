import { useRef, useState } from "react";
import { routers } from "./apps/example";
import { Layout, XWindow } from "./features";
import { AppProvider } from "./features/app";
import { WindowManager } from "./features/window-manager";
import { ThemeProviderToggler } from "./shared/hooks/useTheme";
import { XIcon, XItem, XItemLabel, XItemSection, XList } from "./shared/ui";
import "./style/index.css";

function App() {
	const [view, setView] = useState();
	const [path, setPath] = useState();
	const win = useRef();

	/*useEffect(() => {
		console.log(win);
	}, [win]);*/

	return (
		<>
			<AppProvider smKey="core">
				<Layout container overlay toggle view="hhh lpr lff">
					<ThemeProviderToggler slot="header"></ThemeProviderToggler>
					<WindowManager slot="footer"></WindowManager>
					<>
						<AppProvider smKey="app-1">
							<XWindow title="Title" ref={win}>
								<Layout
									container
									overlay
									toggle
									view="lhr lpr lff"
								>
									<XList slot="left" separator>
										{routers.map((item, index) => (
											<XItem
												key={index}
												onClick={() => {
													setView(item.element);
													setPath(item.path);
												}}
												active={item.path === path}
											>
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
									<>{view}</>
								</Layout>
							</XWindow>
						</AppProvider>
					</>
				</Layout>
			</AppProvider>
		</>
	);
}

export default App;
