import { Route, Routes } from "react-router-dom";
import { AppProvider } from "./components/app";
import {
	BtnExample,
	BtnGroupExample,
	HomeExample,
	LinkExample,
	ListExample,
} from "./components/example";
import { ThemeProviderToggler } from "./components/hooks/useTheme";
import { XIcon, XItem, XItemLabel, XItemSection, XList } from "./components/ui";
import { XLayout } from "./components/ui/layout";
function App() {
	return (
		<AppProvider config={{ smKey: "app-1" }}>
			<XLayout container overlay toggle view="lhr lpr lff">
				{{
					left: (props) => {
						//return 'left';
						return (
							<XList separator>
								<XItem to="/">
									<XItemSection side>
										<XIcon>mdi-home</XIcon>
									</XItemSection>
									<XItemSection>
										<XItemLabel lines>Home</XItemLabel>
									</XItemSection>
								</XItem>
								<XItem to="/accordion">
									<XItemSection side>
										<XIcon>mdi-table-column</XIcon>
									</XItemSection>
									<XItemSection>
										<XItemLabel lines>
											XAccordion
										</XItemLabel>
									</XItemSection>
								</XItem>
								<XItem to="/btn">
									<XItemSection side>
										<XIcon>mdi-button-pointer</XIcon>
									</XItemSection>
									<XItemSection>
										<XItemLabel lines>XBtn</XItemLabel>
									</XItemSection>
								</XItem>
								<XItem to="/btn-group">
									<XItemSection side>
										<XIcon>mdi-card-outline</XIcon>
									</XItemSection>
									<XItemSection>
										<XItemLabel lines>XBtnGroup</XItemLabel>
									</XItemSection>
								</XItem>
								<XItem to="/cards">
									<XItemSection side>
										<XIcon>mdi-cards</XIcon>
									</XItemSection>
									<XItemSection>
										<XItemLabel lines>XCards</XItemLabel>
									</XItemSection>
								</XItem>

								<XItem to="/input">
									<XItemSection side>
										<XIcon>mdi-form-textbox</XIcon>
									</XItemSection>
									<XItemSection>
										<XItemLabel lines>XInput</XItemLabel>
									</XItemSection>
								</XItem>
								<XItem to="/select">
									<XItemSection side>
										<XIcon>mdi-select</XIcon>
									</XItemSection>
									<XItemSection>
										<XItemLabel lines>XSelect</XItemLabel>
									</XItemSection>
								</XItem>
								<XItem to="/link">
									<XItemSection side>
										<XIcon>mdi-link</XIcon>
									</XItemSection>
									<XItemSection>
										<XItemLabel lines>XLink</XItemLabel>
									</XItemSection>
								</XItem>
								<XItem to="/list">
									<XItemSection side>
										<XIcon>mdi-view-list</XIcon>
									</XItemSection>
									<XItemSection>
										<XItemLabel lines>XList</XItemLabel>
									</XItemSection>
								</XItem>
								<XItem to="/message">
									<XItemSection side>
										<XIcon>mdi-message-alert-outline</XIcon>
									</XItemSection>
									<XItemSection>
										<XItemLabel lines>XMessage</XItemLabel>
									</XItemSection>
								</XItem>
								<XItem to="/progress">
									<XItemSection side>
										<XIcon>mdi-progress-helper</XIcon>
									</XItemSection>
									<XItemSection>
										<XItemLabel lines>XProgress</XItemLabel>
									</XItemSection>
								</XItem>
								<XItem to="/spinner">
									<XItemSection side>
										<XIcon>mdi-reload</XIcon>
									</XItemSection>
									<XItemSection>
										<XItemLabel lines>XSpinner</XItemLabel>
									</XItemSection>
								</XItem>
								<XItem to="/tabs">
									<XItemSection side>
										<XIcon>mdi-tab</XIcon>
									</XItemSection>
									<XItemSection>
										<XItemLabel lines>XTabs</XItemLabel>
									</XItemSection>
								</XItem>
							</XList>
						);
					},
					header: <ThemeProviderToggler></ThemeProviderToggler>,
					//header: "header",
					footer: "footer",
					//right: 'right',
					default: (props) => (
						<Routes>
							<Route path="/" element={<HomeExample />} />
							<Route path="/btn" element={<BtnExample />} />
							<Route
								path="/btn-group"
								element={<BtnGroupExample />}
							/>
							<Route path="/list" element={<ListExample />} />
							<Route path="/link" element={<LinkExample />} />
						</Routes>
					),
				}}
			</XLayout>
		</AppProvider>
	);
}

export default App;
