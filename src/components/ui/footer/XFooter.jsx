import classNames from "classnames";
import React, { useContext, useMemo } from "react";
import { XLayoutContext } from "../layout/XLayoutContext";
import "./style.css";

export function XFooter({ children, className }) {
	const { $layout } = useContext(XLayoutContext);
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
