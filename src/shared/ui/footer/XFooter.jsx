import classNames from "classnames";
import { memo, useEffect, useRef } from "react";
import { useForkRef } from "../../hooks";
import { forwardRefWithAs } from "../../internal/render";
import { Sections } from "../../internal/sections";
import { useXLayoutContext } from "../layout/XLayoutContext";
import "./style.css";

export const XFooter = memo(
	forwardRefWithAs(function XFooterFn(
		{ children, className, ...props },
		ref
	) {
		const innerRef = useRef(null);
		const handleRef = useForkRef(innerRef, ref);

		const ctx = useXLayoutContext();

		useEffect(() => {
			if (innerRef.current) {
				ctx.instances.footer = innerRef.current;
			}
			return () => {
				delete ctx.instances.footer;
			};
		}, [innerRef.current]);

		const isLayout = !!ctx;
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
				ref={handleRef}
			>
				{children}
			</Sections>
		);
	})
);
