import classNames from "classnames";
import React from "react";
import { Sections } from "../../internal/sections";
import "./style.css";

export function XFooter({ children, className, ...props }) {
	return (
		<Sections
			as="footer"
			square
			{...props}
			className={classNames("x-footer", className)}
		>
			{children}
		</Sections>
	);
}
