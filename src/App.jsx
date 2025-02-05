import { Route, Routes } from "react-router-dom";
import { AppProvider } from "./components/app";
import {
	AccordionExample,
	BtnExample,
	BtnGroupExample,
	CardsExample,
	HomeExample,
	InputExample,
	LinkExample,
	ListExample,
	MessageExample,
	PopoverExample,
	ProgressExample,
	SelectExample,
	SpinnerExample,
	TabsExample,
} from "./components/example";
import { ThemeProviderToggler } from "./components/hooks/useTheme";
import { XIcon, XItem, XItemLabel, XItemSection, XList } from "./components/ui";
import { XLayout } from "./components/ui/layout";
function App() {
	const routers = [
		{
			icon: "mdi-home",
			label: "Home",
			to: "/",
		},
		{
			icon: "mdi-table-column",
			label: "XAccordion",
			to: "/accordion",
		},
		{
			icon: "mdi-button-pointer",
			label: "XBtn",
			to: "/btn",
		},
		{
			icon: "mdi-card-outline",
			label: "XBtnGroup",
			to: "/btn-group",
		},

		{
			icon: "mdi-cards",
			label: "XCards",
			to: "/cards",
		},
		{
			icon: "mdi-message",
			label: "XPopover",
			to: "/popover",
		},
		{
			icon: "mdi-form-textbox",
			label: "XInput",
			to: "/input",
		},
		{
			icon: "mdi-select",
			label: "XSelect",
			to: "/select",
		},
		{
			icon: "mdi-link",
			label: "XLink",
			to: "/link",
		},
		{
			icon: "mdi-view-list",
			label: "XList",
			to: "/list",
		},
		{
			icon: "mdi-message-alert-outline",
			label: "XMessage",
			to: "/message",
		},
		{
			icon: "mdi-progress-helper",
			label: "XProgress",
			to: "/progress",
		},
		{
			icon: "mdi-reload",
			label: "XSpinner",
			to: "/spinner",
		},
		{
			icon: "mdi-tab",
			label: "XTabs",
			to: "/tabs",
		},
	];

	return (
		<AppProvider config={{ smKey: "app-1" }}>
			<XLayout container overlay toggle view="lhr lpr lff">
				{{
					left: (props) => {
						//return "left";
						return (
							<XList separator>
								{routers.map((item, index) => (
									<XItem key={index} to={item.to}>
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
							<Route path="/" element={<HomeExample />} />
							<Route path="/btn" element={<BtnExample />} />
							<Route
								path="/btn-group"
								element={<BtnGroupExample />}
							/>
							<Route path="/input" element={<InputExample />} />
							<Route path="/link" element={<LinkExample />} />
							<Route path="/list" element={<ListExample />} />
							<Route
								path="/message"
								element={<MessageExample />}
							/>
							<Route
								path="/spinner"
								element={<SpinnerExample />}
							/>
							<Route path="/tabs" element={<TabsExample />} />
							<Route
								path="/progress"
								element={<ProgressExample />}
							/>
							<Route path="/cards" element={<CardsExample />} />
							<Route
								path="/accordion"
								element={<AccordionExample />}
							/>
							<Route
								path="/accordion"
								element={<AccordionExample />}
							/>
							<Route path="/select" element={<SelectExample />} />
							<Route
								path="/popover"
								element={<PopoverExample />}
							/>
						</Routes>
					),
				}}
			</XLayout>
		</AppProvider>
	);
}

export default App;
