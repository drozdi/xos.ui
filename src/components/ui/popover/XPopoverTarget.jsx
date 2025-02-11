import classNames from "classnames";
import PropTypes from "prop-types";
import { cloneElement, forwardRef, useEffect, useRef } from "react";
import { useXPopoverContext } from "./XPopoverContext";
import "./style.css";

export const XPopoverTarget = forwardRef(function XPopoverTarget(
	{ children, type = "dialog", ...props },
	ref
) {
	const ctx = useXPopoverContext();
	const elementRef = useRef(null);

	useEffect(() => {
		console.log(elementRef.current?.getBoundingClientRect());
		ctx.placement = elementRef.current?.getBoundingClientRect();
	}, [elementRef]);

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
		ref: elementRef,
	});
});
XPopoverTarget.propTypes = {
	children: PropTypes.node,
};
