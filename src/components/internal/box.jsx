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
				[`x-box--align-${align}`]: align,
				[`x-box--justify-${justify}`]: justify,
			},
			className
		),
		ref,
	});
});

Box.Section = forwardRefWithAs(function Section({ className, ...props }, ref) {
	return render("span", {
		...props,
		className: classNames("x-box-section", className),
		ref,
	});
});
