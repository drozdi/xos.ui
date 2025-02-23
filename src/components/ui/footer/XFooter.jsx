import classNames from "classnames";
import React, { useMemo } from "react";
import { useXLayoutContext } from "../layout/XLayoutContext";
import "./style.css";

export function XFooter({ children, className }) {
	const { $layout } = useXLayoutContext();
	const isLayout = useMemo(() => !!$layout, [$layout]);
	return (
		<footer
			className={classNames(className, "xFooter", {
				"xLayout-footer": isLayout,
			})}
		>
			{children}
		</footer>
	);
}
