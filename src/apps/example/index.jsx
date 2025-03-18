import { AccordionExample } from "./accordion";
import { BtnExample } from "./btn";
import { BtnGroupExample } from "./btnGroup";
import { CardsExample } from "./cards";
import { HomeExample } from "./home";
import { InputExample } from "./input";
import { LinkExample } from "./link";
import { ListExample } from "./list";
import { MessageExample } from "./message";
import { PaginationExample } from "./pagination";
import { PopoverExample } from "./popover";
import { ProgressExample } from "./progress";
import { SelectExample } from "./select";
import { SpinnerExample } from "./spinner";
import { TableExample } from "./table";
import { TabsExample } from "./tabs";

export * from "./accordion";
export * from "./btn";
export * from "./btnGroup";
export * from "./cards";
export * from "./home";
export * from "./input";
export * from "./link";
export * from "./list";
export * from "./message";
export * from "./pagination";
export * from "./popover";
export * from "./progress";
export * from "./select";
export * from "./spinner";
export * from "./table";
export * from "./tabs";

export const routers = [
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
	{
		icon: "mdi-table",
		label: "XTable",
		path: "/table",
		element: <TableExample />,
	},
	{
		icon: "mdi-format-page-break",
		label: "XPagination",
		path: "/pagination",
		element: <PaginationExample />,
	},
];

export default function ({
	btn,
	input,
	btnGroup,
	list,
	tabs,
	link,
	message,
	spinner,
	progress,
	cards,
	accordion,
	select,
	popover,
}) {
	return (
		<div className="py-8">
			{btnGroup && <BtnGroupExample />}
			{btn && <BtnExample />}
			{input && <InputExample />}
			{select && <SelectExample />}
			{link && <LinkExample />}
			{list && <ListExample />}
			{message && <MessageExample />}
			{spinner && <SpinnerExample />}
			{progress && <ProgressExample />}
			{popover && <PopoverExample />}
			{cards && <CardsExample />}
			{accordion && <AccordionExample />}
			{tabs && <TabsExample />}
		</div>
	);
}
