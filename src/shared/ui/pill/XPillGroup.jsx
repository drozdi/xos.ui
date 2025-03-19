import classNames from "classnames";
import PropTypes from "prop-types";
import { Box } from "../../internal/box";
import "./style.css";
import { XPillGroupProvider } from "./XPillGroupContext";

export function XPillGroup({ children, className, disabled, size }) {
	return (
		<XPillGroupProvider
			value={{
				disabled,
				size,
			}}
		>
			<Box
				className={classNames("x-pill-group", className)}
				align="center"
			>
				{children}
			</Box>
		</XPillGroupProvider>
	);
}

XPillGroup.displayName = "ui/XPillGroup";
XPillGroup.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	size: PropTypes.oneOf,
};
