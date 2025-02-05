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
			path: "/",
			element: <HomeExample />,
		},
		{
			icon: "mdi-table-column",
			label: "XAccordion",
			path: "/accordion",
			element: <AccordionExample />,
		},
		{
			icon: "mdi-button-pointer",
			label: "XBtn",
			path: "/btn",
			element: <BtnExample />,
		},
		{
			icon: "mdi-card-outline",
			label: "XBtnGroup",
			path: "/btn-group",
			element: <BtnGroupExample />,
		},

		{
			icon: "mdi-cards",
			label: "XCards",
			path: "/cards",
			element: <CardsExample />,
		},
		{
			icon: "mdi-message",
			label: "XPopover",
			path: "/popover",
			element: <PopoverExample />,
		},
		{
			icon: "mdi-form-textbox",
			label: "XInput",
			path: "/input",
			element: <InputExample />,
		},
		{
			icon: "mdi-select",
			label: "XSelect",
			path: "/select",
			element: <SelectExample />,
		},
		{
			icon: "mdi-link",
			label: "XLink",
			path: "/link",
			element: <LinkExample />,
		},
		{
			icon: "mdi-view-list",
			label: "XList",
			path: "/list",
			element: <ListExample />,
		},
		{
			icon: "mdi-message-alert-outline",
			label: "XMessage",
			path: "/message",
			element: <MessageExample />,
		},
		{
			icon: "mdi-progress-helper",
			label: "XProgress",
			path: "/progress",
			element: <ProgressExample />,
		},
		{
			icon: "mdi-reload",
			label: "XSpinner",
			path: "/spinner",
			element: <SpinnerExample />,
		},
		{
			icon: "mdi-tab",
			label: "XTabs",
			path: "/tabs",
			element: <TabsExample />,
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
