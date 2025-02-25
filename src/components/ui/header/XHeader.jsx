import classNames from "classnames";
import { memo } from "react";
import { Sections } from "../../internal/sections";
import "./style.css";

export const XHeader = memo(function XHeaderFn({
	children,
	className,
	...props
}) {
	return (
		<Sections
			as="header"
			square
			{...props}
			className={classNames("x-header", className)}
		>
			{children}
		</Sections>
	);
});
