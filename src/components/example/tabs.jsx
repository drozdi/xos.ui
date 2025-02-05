import { XTabs, XTabsList, XTabsPanel, XTabsPanels, XTabsTab } from '../ui';
import { Form, useProps } from './utils';

export function TabsExample() {
	const tabsExample = useProps(
		{
			keepMounted: false,
			vertical: false,
			pills: false,
		},
		'XTabs',
		`
		<XTabsList grow>
			<XTabsTab
				value="item-1"
				leftSection="mdi-home"
				rightSection="mdi-close">
				Item 1
			</XTabsTab>
			<XTabsTab leftSection="mdi-home" value="item-2">
				Item 2
			</XTabsTab>
			<XTabsTab rightSection="mdi-close" value="item-3">
				Item 3
			</XTabsTab>
		</XTabsList>
		<XTabsPanels>
			<XTabsPanel value="item-1">Tabs 1</XTabsPanel>
			<XTabsPanel value="item-2">Tabs 2</XTabsPanel>
			<XTabsPanel value="item-3">Tabs 3</XTabsPanel>
		</XTabsPanels>
	`,
	);
	return (
		<div className="max-w-4xl m-auto py-4 relative">
			<h2 className="text-center text-2xl mb-4 bg-bgmb1">XTabs</h2>
			<XTabs {...tabsExample.props}>
				<XTabsList grow>
					<XTabsTab
						value="item-1"
						leftSection="mdi-home"
						rightSection="mdi-close"
					>
						Item 1
					</XTabsTab>
					<XTabsTab leftSection="mdi-home" value="item-2">
						Item 2
					</XTabsTab>
					<XTabsTab disabled rightSection="mdi-close" value="item-3">
						Item 3
					</XTabsTab>
				</XTabsList>
				<XTabsPanels>
					<XTabsPanel value="item-1">
						<div>Tabs 1</div>
						<div>Tabs 1</div>
					</XTabsPanel>
					<XTabsPanel value="item-2">
						<div>Tabs 2</div>
						<div>Tabs 2</div>
					</XTabsPanel>
					<XTabsPanel value="item-3">
						<div>Tabs 3</div>
						<div>Tabs 3</div>
					</XTabsPanel>
				</XTabsPanels>
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
							keepMounted: { type: 'checkbox' },
							vertical: { type: 'checkbox' },
							pills: { type: 'checkbox' },
						},
						tabsExample,
					)}
				</div>
			</div>
		</div>
	);
}
