import classNames from 'classnames';
import PropTypes from 'prop-types';
import './styles.css';
import { useXTabsContext } from './XTabsContext';
export function XTabsPanel({ className, children, value, keepMounted, ...props }) {
	const ctx = useXTabsContext();
	const active = ctx.isActive(value);
	const content = ctx.keepMounted || keepMounted ? children : active ? children : null;
	return (
		<div
			{...props}
			className={classNames(
				'x-tabs-panel',
				{
					'x-tabs-panel--active': active,
				},
				className,
			)}
			role="tabpanel"
			id={ctx.getPanelId(value)}
			aria-labelledby={ctx.getTabId(value)}
			aria-hidden={!active}
		>
			{content}
		</div>
	);
}

XTabsPanel.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	value: PropTypes.string,
	keepMounted: PropTypes.bool,
};
