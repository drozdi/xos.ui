import classNames from "classnames";
import { memo, useEffect } from "react";
import { forwardRefWithAs } from "../../shared/internal/render";
import { Sections } from "../../shared/internal/sections";
import { useXLayoutContext } from "../layout/XLayoutContext";
import "./style.css";

export const XHeader = memo(
	forwardRefWithAs(function XHeaderFn(
		{ children, className, ...props },
		ref
	) {
		const { $layout } = useXLayoutContext();

		useEffect(() => {
			$layout.instances.header = true;
		}, []);
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
	})
);
