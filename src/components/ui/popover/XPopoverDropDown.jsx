import PropTypes from "prop-types";
import { useXPopoverContext } from "./XPopoverContext";
import "./style.css";

export function XPopoverDropDown({ children }) {
	const ctx = useXPopoverContext();
	return <div>{children}</div>;
}
XPopoverDropDown.propTypes = {
	children: PropTypes.node,
};
