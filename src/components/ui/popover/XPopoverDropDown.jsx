import classNames from "classnames";
import PropTypes from "prop-types";
import { useXPopoverContext } from "./XPopoverContext";
import "./style.css";

export function XPopoverDropDown({ children }) {
	const ctx = useXPopoverContext();
	const defPos = ctx.position;
	const arrow = ctx.arrow;
	const offset = ctx.offset;
	return (
		<div
			className={classNames("x-popover__dropdown", {
				"x-popover__dropdown--arrow": arrow,
			})}
			style={{
				"--popover-offset-val": offset,
			}}
		>
			{children}
		</div>
	);
}

XPopoverDropDown.propTypes = {
	children: PropTypes.node,
};
