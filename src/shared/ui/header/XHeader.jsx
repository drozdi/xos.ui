import classNames from "classnames";
import { memo } from "react";
import { Sections } from "../../internal/sections";
import { useXLayoutContext } from "../layout/XLayoutContext";
import "./style.css";

export const XHeader = memo(function XHeaderFn({
	children,
	className,
	...props
}) {
	const isLayout = !!useXLayoutContext();
	return (
		<Sections
			as="header"
			square
			{...props}
			className={classNames(
				"x-header",
				{
					"x-layout-header": isLayout,
				},
				className
			)}
		>
			{children}
		</Sections>
	);
});
