import classNames from "classnames";
import { forwardRefWithAs, render } from "./render";

export const Box = forwardRefWithAs(function Box(
	{ className, col, nowrap, size, align, justify, ...props },
	ref
) {
	return render("div", {
		...props,
		className: classNames(
			"x-box",
			{
				"x-box--col": col,
				"x-box--nowrap": nowrap,
				[`x-box--${size}`]: size,
				[`align-${align}`]: align,
				[`justify-${justify}`]: justify,
			},
			className
		),
		ref,
	});
});

Box.Section = forwardRefWithAs(function Section(
	{ className, top, side, nowrap, ...props },
	ref
) {
	return render("span", {
		...props,
		className: classNames(
			"x-box-section",
			{
				"x-box-section--side": side,
				"justify-start": top,
				"text-nowrap": nowrap,
			},
			className
		),
		ref,
	});
});
