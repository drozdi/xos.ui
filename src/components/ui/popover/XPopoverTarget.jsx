import PropTypes from "prop-types";
import { cloneElement } from "react";
import { useXPopoverContext } from "./XPopoverContext";
import "./style.css";

export function XPopoverTarget({ children }) {
	const ctx = useXPopoverContext();

	const accessibleProps = ctx.withRoles
		? {
				//'aria-haspopup': popupType,
				"aria-expanded": ctx.opened,
				"aria-controls": ctx.getDropdownId(),
				id: ctx.getTargetId(),
		  }
		: {};
	return cloneElement(children, {
		...accessibleProps,
		onClick: ctx?.onToggle,
	});

	return <div>{children}</div>;
}
XPopoverTarget.propTypes = {
	children: PropTypes.node,
};
