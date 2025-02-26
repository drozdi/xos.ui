import classNames from "classnames";
import React from "react";
import { Sections } from "../../internal/sections";
import { useXLayoutContext } from "../layout/XLayoutContext";
import "./style.css";

export function XFooter({ children, className, ...props }) {
	const isLayout = !!useXLayoutContext();
	return (
		<Sections
			as="footer"
			square
			{...props}
			className={classNames(
				"x-footer",
				{
					"x-layout-footer": isLayout,
				},
				className
			)}
		>
			{children}
		</Sections>
	);
}
