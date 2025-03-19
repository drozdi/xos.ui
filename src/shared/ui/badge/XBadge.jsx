import classNames from "classnames";
import PropTypes from "prop-types";
import { Sections } from "../../internal/sections";
import "./style.css";
export function XBadge({ children, className, ...props }) {
	return (
		<Sections
			{...props}
			className={classNames("x-badge", className)}
			bodyClass="x-badge-label"
		>
			{children}
		</Sections>
	);
}

XBadge.displayName = "ui/XBadge";

XBadge.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	size: PropTypes.oneOf(["xs", "sm", "lg", "xl"]),
	onRemove: PropTypes.func,
};
