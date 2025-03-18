import classNames from "classnames";
import PropTypes from "prop-types";
import { useXPaginationContext } from "./XPaginationContext";
import "./style.css";

export const XPaginationBtn = ({
	children,
	className,
	active,
	disabled,
	...props
}) => {
	const ctx = useXPaginationContext();
	const _disabled = disabled || ctx.disabled;
	return (
		<button
			{...props}
			disabled={_disabled}
			className={classNames(
				"x-pagination-btn",
				{
					"x-pagination-btn--active": active,
				},
				className
			)}
		>
			{children}
		</button>
	);
};

XPaginationBtn.displayName = "ui/XPaginationBtn";
XPaginationBtn.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	active: PropTypes.bool,
	disabled: PropTypes.bool,
};
