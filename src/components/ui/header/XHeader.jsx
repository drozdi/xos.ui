import classNames from "classnames";
import React, { memo, useContext, useMemo } from "react";
import { useSlots } from "../../hooks/useSlots";
import { XLayoutContext } from "../layout/XLayoutContext";
import "./style.css";

export const XHeader = memo(function XHeader({ children, className }) {
	const { $layout } = useContext(XLayoutContext);
	const isLayout = useMemo(() => !!$layout, [$layout]);
	const { slot, slots } = useSlots(children);
	return (
		<header
			className={classNames(className, "xHeader", {
				"xLayout-header": isLayout,
			})}
		>
			<div className="xHeader-prepend">{slot("prepend", null)}</div>
			<div className="xHeader-content">{slot("", null)}</div>
			<div className="xHeader-append">{slot("append", null)}</div>
		</header>
	);
});
