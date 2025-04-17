import classNames from "classnames";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useForkRef } from "../../hooks";
import { forwardRefWithAs } from '../../internal/render';
import "./style.css";
import { useXPopoverContext } from "./XPopoverContext";

function isInViewport(element, axis = "xy") {
	const rect = element.getBoundingClientRect();
	const html = document.documentElement;

	if (axis.includes("x")) {
		if (
			rect.left < 0 ||
			rect.right > (window.innerWidth || html.clientWidth)
		) {
			return false;
		}
	}

	if (axis.includes("y")) {
		if (
			rect.top < 0 ||
			rect.bottom > (window.innerHeight || html.clientHeight)
		) {
			return false;
		}
	}

	return true;
}

export const XPopoverDropDown = forwardRefWithAs(({ children }, ref) => {
	const ctx = useXPopoverContext();
	const elementRef = useRef();
	const [position, setPosition] = useState(ctx.position || "bottom");
	const arrow = ctx.arrow;
	const offset = ctx.offset;
	const opened = ctx.opened;

	useEffect(() => {
		return;
		if (!opened || !elementRef.current) return;
		let pos = position.split("-");
		if (["top", "bottom"].includes(pos[0])) {
			if (!isInViewport(elementRef.current, "y")) {
				pos[0] = pos[0] === "top" ? "bottom" : "top";
			}
			if (!isInViewport(elementRef.current, "x")) {
				if (pos.length < 2) {
					pos.push("end");
				} else if ((pos[1] = "end")) {
					pos[1] = "start";
				} else if (pos[1] === "start") {
					pos.pop();
				}
			}
			setPosition(pos.join("-"));
		}
		if (["top", "bottom"].includes(pos[0])) {
			if (!isInViewport(elementRef.current, "x")) {
				pos[0] = pos[0] === "left" ? "right" : "left";
			}
			if (!isInViewport(elementRef.current, "y")) {
				if (pos.length < 2) {
					pos.push("end");
				} else if ((pos[1] = "end")) {
					pos[1] = "start";
				} else if (pos[1] === "start") {
					pos.pop();
				}
			}
		}
	}, [position, offset, arrow, opened, elementRef]);

	const targetRef = useForkRef(ctx.floating, elementRef, ref);

	console.log(ctx);

	return (
		<div
			className={classNames("x-popover__dropdown", {
				//"x-popover__dropdown--arrow": arrow,
				//[`x-popover__dropdown--${position}`]: position,
			})}
			style={ctx.popover.floating.floatingStyles}
			ref={targetRef}
		>
			{children}
		</div>
	);
})

XPopoverDropDown.propTypes = {
	children: PropTypes.node,
};
