import PropTypes from "prop-types";
import { XPopoverProvider } from "./XPopoverContext";

export function XPopover({ children }) {
	const context = {};
	return <XPopoverProvider value={context}>{children}</XPopoverProvider>;
}
XPopover.propTypes = {
	children: PropTypes.node,
};
