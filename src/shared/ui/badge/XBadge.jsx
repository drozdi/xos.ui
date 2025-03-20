import classNames from "classnames";
import PropTypes from "prop-types";
import { Sections } from "../../internal/sections";
import { Unstyled } from "../../internal/unstyled";
import "./style.css";

const vars = {
	size: "fs height",
};
export function XBadge({ children, className, size, ...props }) {
	return (
		<Unstyled name="x-badge" vars={vars} size={size}>
			<Sections
				{...props}
				className={classNames("x-badge items-center", className)}
				bodyClass="x-badge-label"
			>
				{children}
			</Sections>
		</Unstyled>
	);
}

XBadge.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	size: PropTypes.oneOf(["xs", "sm", "lg", "xl"]),
	leftSection: PropTypes.node,
	rightSection: PropTypes.node,
};

XBadge.displayName = "ui/XBadge";
