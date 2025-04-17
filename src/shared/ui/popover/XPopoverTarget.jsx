import classNames from "classnames";
import PropTypes from "prop-types";
import { Children, cloneElement } from "react";
import { useForkRef } from "../../hooks";
import { forwardRefWithAs } from '../../internal/render';
import "./style.css";
import { useXPopoverContext } from "./XPopoverContext";

export const XPopoverTarget = forwardRefWithAs(({ children, type = "dialog", ...props}, ref) => {
	Children.only(children);
	const ctx = useXPopoverContext();
	const targetRef = useForkRef(ctx.reference, ref);
	const accessibleProps = {
		"aria-haspopup": type,
		"aria-expanded": ctx.opened,
		"aria-controls": ctx.getDropdownId(),
		id: ctx.getTargetId(),
	};
	return cloneElement(children, {
		...props,
		...accessibleProps,
		className: classNames(props?.className, children?.props?.className),
		onClick: ctx?.onToggle,
		ref: targetRef,
	});
});
XPopoverTarget.propTypes = {
	children: PropTypes.node,
	type: PropTypes.string,
	className: PropTypes.string,
};
