import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { useId } from '../../hooks/useId';
import { scopedKeydownHandler } from '../../internal/events/scoped-keydown-handler';
import './styles.css';
import { XTabsProvider } from './XTabsContext';

export function XTabs({
	className,
	children,
	value,
	id,
	keepMounted,
	vertical,
	pills,
	onChange,
	...props
}) {
	const [currentTab, setCurrentTab] = useState(value);
	const uid = useId(id);

	const context = useMemo(() => {
		const values = [];
		const appendValue = (value) => {
			if (!values.includes(value)) {
				values.push(value);
			}
		};
		return {
			value: currentTab,
			values,
			keepMounted,
			vertical,
			isActive: (value) => value === currentTab,
			getTabId: (value) => {
				appendValue(value);
				return `${uid}-tab-${value}`;
			},
			getPanelId: (value) => {
				appendValue(value);
				return `${uid}-panel-${value}`;
			},
			onActiveTab: (value) => setCurrentTab(value),
			onKeyDown: scopedKeydownHandler({
				parentSelector: '[role="tablist"]',
				siblingSelector: '[role="tab"]',
				loop: true,
				activateOnFocus: true,
				orientation: 'xy',
			}),
		};
	}, [currentTab, keepMounted, vertical]);
	useEffect(() => onChange?.(currentTab), [currentTab]);
	useEffect(() => setCurrentTab(value), [value]);
	useEffect(() => {
		if (!currentTab) {
			setCurrentTab(context.values[0]);
		}
	}, []);
	return (
		<div
			id={uid}
			{...props}
			className={classNames(
				'x-tabs',
				{
					'x-tabs--vertical': vertical,
					'x-tabs--pills': pills,
				},
				className,
			)}
		>
			<XTabsProvider value={context}>{children}</XTabsProvider>
		</div>
	);
}
