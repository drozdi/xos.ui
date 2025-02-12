import PropTypes from "prop-types";
import { useXPopoverContext } from "./XPopoverContext";
import "./style.css";

export function XPopoverDropDown({ children }) {
	const ctx = useXPopoverContext();
	return (
		<div className="x-popover__dropdown x-popover__dropdown--arrow x-popover__dropdown--bootom-start">
			{children}
		</div>
	);
}

XPopoverDropDown.propTypes = {
	children: PropTypes.node,
};
