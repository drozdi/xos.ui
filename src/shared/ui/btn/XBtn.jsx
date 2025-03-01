import classNames from "classnames";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import { useBtn } from "../../hooks/useBtn";
import { XIcon } from "../icon";
import { XBtnGroup, useXBtnGroupContext } from "./group";
import "./style.css";

import { useDisabled } from "../../internal/disabled";
import { forwardRefWithAs, render } from "../../internal/render";
import { Sections } from "../../internal/sections";
import { isFunction } from "../../utils/is";
import { XSpinner } from "../spinner";

const XBtnRoot = forwardRefWithAs(function XBtnFn(params, ref) {
	const providedDisabled = useDisabled();
	const ctx = useXBtnGroupContext();
	const props = { ...ctx?.btnProps, ...params };
	if (ctx) {
		props.onClick = (event, value) => {
			ctx.onChange?.(event, props.value);
			params.onClick?.(event, value);
		};
		props.active = ctx.isActive?.(props.value) || params.active;
		props.disabled = ctx.isDisabled?.(props.value) || params.disabled;
	}

	const {
		color,
		size,
		flat,
		text,
		tonal,
		plain,
		outline,
		block,
		square,
		round,
		rounded,
		dimmed,
		loading,
		link,
		active: propsActive,
		leftSection,
		rightSection,
		...rest
	} = props;

	const { children, className } = props;
	const {
		active = propsActive || false,
		disabled = providedDisabled || false,
		attrs,
	} = useBtn(props, ref);

	const isIcon = useMemo(
		() =>
			(!!leftSection != !!rightSection && !children) ||
			(children?.type === XIcon && !leftSection && !rightSection),
		[children, leftSection, rightSection]
	);

	return render(
		"button",
		{
			...rest,
			...attrs,
			className: classNames(
				"x-btn",
				{
					"x-btn--flat": flat,
					"x-btn--text": text,
					"x-btn--tonal": tonal,
					"x-btn--plain": plain,
					"x-btn--outline": outline,
					"x-btn--block": block,
					"x-btn--square": square,
					"x-btn--round": round,
					"x-btn--rounded": rounded,
					"x-btn--dimmed": dimmed,
					"x-btn--link": link,
					"x-btn--icon": isIcon,
					"x-btn--active": propsActive,
					"x-btn--loading": loading,
					[`x-btn--${color}`]: color,
					[`x-btn--${size}`]: size,
				},
				className
			),
			children: isFunction(children) ? (
				children
			) : (
				<>
					<Sections
						leftSection={leftSection}
						rightSection={rightSection}
						className="x-btn-content"
						bodyClass="x-btn-label"
						size={size}
					>
						{children}
					</Sections>
					<span className="x-btn-loader">
						<XSpinner size="1.5em" thickness="5" />
					</span>
				</>
			),
		},
		{
			disabled,
			active,
		}
	);
});

XBtnRoot.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.element,
		PropTypes.string,
		PropTypes.func,
	]),
	className: PropTypes.string,
	dimmed: PropTypes.bool,
	flat: PropTypes.bool,
	text: PropTypes.bool,
	tonal: PropTypes.bool,
	plain: PropTypes.bool,
	outline: PropTypes.bool,

	loading: PropTypes.bool,

	round: PropTypes.bool,
	block: PropTypes.bool,
	square: PropTypes.bool,
	rounded: PropTypes.bool,
	disabled: PropTypes.bool,
	active: PropTypes.bool,
	link: PropTypes.bool,

	leftSection: PropTypes.node,
	rightSection: PropTypes.node,
	color: PropTypes.string,
	size: PropTypes.PropTypes.string,
	onClick: PropTypes.func,

	value: PropTypes.any,
}; //*/

export const XBtn = memo(XBtnRoot);

XBtn.Group = XBtnGroup;
