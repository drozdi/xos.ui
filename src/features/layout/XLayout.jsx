import classNames from "classnames";
import { memo, useEffect, useMemo, useRef } from "react";
import { useForkRef, useResizeObserver } from "../../shared/hooks";
import { Box } from "../../shared/internal/box";
import { forwardRefWithAs } from "../../shared/internal/render";
import "./style.css";
import { XLayoutProvider, useXLayoutContext } from "./XLayoutContext";

export function XLayout({
	children,
	className,
	container,
	view = "hhh lpr fff",
	onResize,
}) {
	const {
		ref: containerRef,
		width,
		height,
	} = useResizeObserver({
		onResize,
	});

	const rows = useMemo(
		() =>
			view.split(" ").map((row) => {
				return row.split("");
			}),
		[view]
	);

	const ctx = useMemo(() => {
		const instances = {};
		return {
			get container() {
				return container;
			},
			get instances() {
				return instances;
			},
			set instances(val) {
				instances = val;
			},
			rows,
			width,
			height,
		};
	}, [container, width, height, rows]);
	console.log("layout", ctx);

	const isHl = useMemo(
		() => rows[0][0] === "l" || !ctx.instances.header,
		[rows]
	);
	const isHr = useMemo(
		() => rows[0][2] === "r" || !ctx.instances.header,
		[rows]
	);
	const isFl = useMemo(
		() => rows[2][0] === "l" || !ctx.instances.footer,
		[rows]
	);
	const isFr = useMemo(
		() => rows[2][2] === "r" || !ctx.instances.footer,
		[rows]
	);

	const classes = useMemo(
		() => ({
			"x-layout--hl": isHl,
			"x-layout--hr": isHr,
			"x-layout--fl": isFl,
			"x-layout--fr": isFr,
		}),
		[isHl, isHr, isFl, isFr]
	);

	let layout = (
		<div className={classNames("x-layout", classes, className)}>
			{children}
		</div>
	);
	if (container) {
		layout = (
			<div className="x-layout-container" ref={containerRef}>
				{layout}
			</div>
		);
	}

	return (
		<>
			<XLayoutProvider value={ctx}>{layout}</XLayoutProvider>
		</>
	);
}

export const XMain = memo(
	forwardRefWithAs(function XMain({ children, className, ...props }, ref) {
		const innerRef = useRef(null);
		const handleRef = useForkRef(innerRef, ref);

		const ctx = useXLayoutContext();

		useEffect(() => {
			if (innerRef.current) {
				ctx.instances.main = innerRef.current;
			}
			return () => {
				delete ctx.instances.main;
			};
		}, [innerRef.current]);

		const isLayout = !!ctx;
		return (
			<Box
				as="section"
				square
				{...props}
				className={classNames("x-layout-main", className)}
				ref={handleRef}
			>
				<Box.Section as="main" className="x-layout-body">
					{children}
				</Box.Section>
			</Box>
		);
	})
);
