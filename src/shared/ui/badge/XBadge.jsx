import classNames from "classnames";
import PropTypes from "prop-types";
import { Sections } from "../../internal/sections";
import "./style.css";
export function XBadge({ children, className, ...props }) {
	return (
		<Sections
			{...props}
			className={classNames("x-badge items-center", className)}
			bodyClass="x-badge-label"
		>
			{children}
		</Sections>
	);
}

XBadge.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	leftSection: PropTypes.node,
	rightSection: PropTypes.node,
};

XBadge.displayName = "ui/XBadge";
