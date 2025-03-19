import classNames from "classnames";
import PropTypes from "prop-types";
import { Sections } from "../../internal/sections";
import { XBtn } from "../btn";
import "./style.css";
import { XPillGroup } from "./XPillGroup";
import { useXPillGroupContext } from "./XPillGroupContext";

export function XPill({ children, className, size, disabled, onRemove }) {
	const ctx = useXPillGroupContext();
	const _size = size || ctx?.size || undefined;
	const _disabled = disabled || ctx?.disabled;
	return (
		<Sections
			as="span"
			className={classNames(
				"x-pill",
				{
					"x-pill--disabled": _disabled,
					[`x-pill--${_size}`]: _size,
				},
				className
			)}
			bodyClass="x-pill-label"
			rightSection={
				onRemove && (
					<XBtn
						flat
						size="xs"
						onClick={(event) => {
							event.preventDefault();
							event.stopPropagation();
							onRemove?.(event);
						}}
						disabled={_disabled}
						leftSection="mdi-close"
					/>
				)
			}
		>
			{children}
		</Sections>
	);
}

XPill.displayName = "ui/XPill";
XPill.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	size: PropTypes.oneOf(["xs", "sm", "lg", "xl"]),
	onRemove: PropTypes.func,
};

XPill.Group = XPillGroup;
