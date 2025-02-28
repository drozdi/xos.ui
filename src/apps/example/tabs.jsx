import { XTabs } from "../../shared/ui";
import { Form, useProps } from "./utils";

export function TabsExample() {
	const tabsExample = useProps(
		{
			keepMounted: false,
			vertical: false,
			pills: false,
		},
		"XTabs",
		`
		<XTabs.List grow>
			<XTabs.Tab
				value="item-1"
				leftSection="mdi-home"
				rightSection="mdi-close">
				Item 1
			</XTabs.Tab>
			<XTabs.Tab leftSection="mdi-home" value="item-2">
				Item 2
			</XTabs.Tab>
			<XTabs.Tab rightSection="mdi-close" value="item-3">
				Item 3
			</XTabs.Tab>
		</XTabs.List>
		<XTabs.Panels>
			<XTabs.Panel value="item-1">Tabs 1</XTabs.Panel>
			<XTabs.Panel value="item-2">Tabs 2</XTabs.Panel>
			<XTabs.Panel value="item-3">Tabs 3</XTabs.Panel>
		</XTabs.Panels>
	`
	);
	return (
		<div className="max-w-4xl m-auto py-4 relative">
			<h2 className="text-center text-2xl mb-4 bg-bgmb1">XTabs</h2>
			<XTabs {...tabsExample.props}>
				<XTabs.List grow>
					<XTabs.Tab
						value="item-1"
						leftSection="mdi-home"
						rightSection="mdi-close"
					>
						Item 1
					</XTabs.Tab>
					<XTabs.Tab leftSection="mdi-home" value="item-2">
						Item 2
					</XTabs.Tab>
					<XTabs.Tab disabled rightSection="mdi-close" value="item-3">
						Item 3
					</XTabs.Tab>
				</XTabs.List>
				<XTabs.Panels>
					<XTabs.Panel value="item-1">
						<div>Tabs 1</div>
						<div>Tabs 1</div>
					</XTabs.Panel>
					<XTabs.Panel value="item-2">
						<div>Tabs 2</div>
						<div>Tabs 2</div>
					</XTabs.Panel>
					<XTabs.Panel value="item-3">
						<div>Tabs 3</div>
						<div>Tabs 3</div>
					</XTabs.Panel>
				</XTabs.Panels>
			</XTabs>
			<div className="mt-8 grid grid-cols-2 *:col-span-1 *:p-4 *:border *:border-separator">
				<div>
					<pre className="bg-sky-500/50 text-white p-2 rounded-md mt-4 select-text overflow-scroll">
						{tabsExample.code}
					</pre>
				</div>
				<div>
					{Form(
						{
							keepMounted: { type: "checkbox" },
							vertical: { type: "checkbox" },
							pills: { type: "checkbox" },
						},
						tabsExample
					)}
				</div>
			</div>
		</div>
	);
}
