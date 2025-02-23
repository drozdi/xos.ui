import classNames from "classnames";
import { memo, useMemo } from "react";
import { Sections } from "../../internal/sections";
import { useXLayoutContext } from "../layout/XLayoutContext";
import "./style.css";

export const XHeader = memo(function XHeaderFn({
	children,
	className,
	...props
}) {
	const { $layout } = useXLayoutContext();
	const isLayout = useMemo(() => !!$layout, [$layout]);

	return (
		<Sections
			as="header"
			{...props}
			className={classNames(className, "x-header", {
				"xLayout-header": isLayout,
			})}
		>
			{children}
		</Sections>
	);
});
