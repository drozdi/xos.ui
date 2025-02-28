import classNames from "classnames";
import PropTypes from "prop-types";
import { Sections } from "../../internal/sections";
import "./styles.css";
import { useXTabsContext } from "./XTabsContext";
export function XTabsTab({
	className,
	children,
	value,
	color,
	disabled,
	tabIndex = 0,
	onClick,
	onKeyDown,
	...props
}) {
	const ctx = useXTabsContext();
	const active = ctx.isActive(value);
	const handleClick = (event) => {
		event.preventDefault();
		if (disabled) {
			return;
		}
		event.value = value;
		onClick?.(event);
		ctx.onActiveTab(value);
	};

	return (
		<Sections
			as="button"
			{...props}
			role="tab"
			square
			id={ctx.getTabId(value)}
			aria-selected={active}
			aria-disabled={disabled}
			aria-controls={ctx.getPanelId(value)}
			disabled={disabled}
			tabIndex={disabled ? -1 : tabIndex}
			className={classNames(
				"x-tabs-tab",
				{
					"x-tabs-tab--disabled": disabled,
					"x-tabs-tab--active": active,
					[`text-${color}`]: color,
				},
				className
			)}
			bodyClass="x-tabs-tab__label"
			onClick={handleClick}
			onKeyDown={ctx.onKeyDown}
		>
			{children}
		</Sections>
	);
}

XTabsTab.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	leftSection: PropTypes.node,
	rightSection: PropTypes.node,
	value: PropTypes.string,
	color: PropTypes.string,
	disabled: PropTypes.bool,
	tabIndex: PropTypes.number,
	onClick: PropTypes.func,
	onKeyDown: PropTypes.func,
};
