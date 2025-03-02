import classNames from "classnames";
import { memo, useEffect, useRef } from "react";
import { useForkRef } from "../../hooks";
import { forwardRefWithAs } from "../../internal/render";
import { Sections } from "../../internal/sections";
import { useXLayoutContext } from "../layout/XLayoutContext";
import "./style.css";

export const XHeader = memo(
	forwardRefWithAs(function XHeaderFn(
		{ children, className, ...props },
		ref
	) {
		const innerRef = useRef(null);
		const handleRef = useForkRef(innerRef, ref);

		const ctx = useXLayoutContext();

		useEffect(() => {
			if (innerRef.current) {
				ctx.instances.header = innerRef.current;
			}
			return () => {
				delete ctx.instances.header;
			};
		}, [innerRef.current]);

		const isLayout = !!ctx;
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
				ref={handleRef}
			>
				{children}
			</Sections>
		);
	})
);
