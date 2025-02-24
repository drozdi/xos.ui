import { Route, Routes } from "react-router-dom";
import { AppProvider } from "./components/app";
import { routers } from "./components/example";
import { ThemeProviderToggler } from "./components/hooks/useTheme";
import {
	XIcon,
	XItem,
	XItemLabel,
	XItemSection,
	XList,
	XWindow,
} from "./components/ui";
import { XLayout } from "./components/ui/layout";
import "./style/index.css";

function App() {
	return <XWindow title="Title"></XWindow>;
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
