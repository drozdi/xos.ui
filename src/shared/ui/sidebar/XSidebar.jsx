import classNames from "classnames";
import PropTypes from "prop-types";
import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";

import { DraggableCore } from "react-draggable";
import { useObjectState } from "../../hooks";
import { useForkRef } from "../../hooks/use-fork-ref";
import { forwardRefWithAs } from "../../internal/render";
import { XBtn } from "../btn/XBtn";
import { useXLayoutContext } from "../layout";
import "./style.css";
import { XSidebarContext } from "./XSidebarContext";

/**
 * @param {*} breakpoint
 * @param {*} ctxWidth
 * @returns {boolean} true if the breakpoint is met
 */
const useBreakpoint = (breakpoint, ctxWidth) => {
	return useMemo(
		() => breakpoint && ctxWidth < breakpoint,
		[breakpoint, ctxWidth]
	);
};

/**
 * XSidebar sidebar component
 * @component Sidebar component for the sidebar component of the XSidebar component. This component is used to render the sidebar component of the XSidebar component.
 * @example <XSidebar>...</XSidebar>
 * @param {Object} props
 * @param {React.ReactNode} props.children children to render inside the sidebar
 * @param {string} [props.className] className to add to the component
 * @param {string} [props.type] type of the sidebar
 * @param {number} [props.breakpoint] breakpoint for the sidebar
 * @param {boolean} [props.mini] whether the sidebar is mini
 * @param {boolean} [props.miniOverlay] whether the mini sidebar overlay is shown
 * @param {boolean} [props.miniToggle] whether the mini sidebar toggle is shown when the sidebar is mini and the sidebar is open (only applies when the sidebar is mini)
 * @param {boolean} [props.miniMouse] whether the mini sidebar toggle is shown when the sidebar is mini and the sidebar is open (only applies when the sidebar is mini) and the sidebar is open (only applies when the sidebar is mini)
 * @param {boolean} [props.open] whether the sidebar is open (only applies when the sidebar is mini)
 * @param {boolean} [props.overlay] whether the sidebar overlay is shown (only applies when the sidebar is mini)
 * @param {boolean} [props.toggle] whether the sidebar toggle is shown (only applies when the sidebar is mini) and the sidebar is open (only applies when the sidebar is mini)
 * @param {boolean} [props.resizeable] whether the sidebar can be resized (only applies when the sidebar is mini)
 * @param {number} [props.w] width of the sidebar (only applies when the sidebar is mini)
 * @param {number} [props.miniW] width of the mini sidebar (only applies when the sidebar is mini)
 * @param {function} [props.onResize] function to call when the sidebar is resized (only applies when the sidebar is mini)
 * @param {function} [props.onMini] function to call when the mini sidebar is resized (only applies when the sidebar is mini)
 * @param {function} [props.onToggle] function to call when the sidebar is toggled (only applies when the sidebar is mini)
 * @param {function} [props.onOpen] function to call when the sidebar is opened (only applies when the sidebar is mini)
 * @param {function} [props.onClose] function to call when the sidebar is closed (only applies when the sidebar is mini)
 * @param {function} [props.onMiniOpen] function to call when the mini sidebar is opened (only applies when the sidebar is mini)
 * @param {function} [props.onMiniClose] function to call when the mini sidebar is closed (only applies when the sidebar is mini)
 * @param {React.Ref<HTMLDivElement>} ref ref to the component
 */

export const XSidebar = memo(
	forwardRefWithAs(function XSidebarFn(
		{
			children,
			className,

			type,
			breakpoint,
			mini,
			miniOverlay,
			miniToggle,
			miniMouse,

			open,
			overlay,
			toggle,

			resizeable,
			w,
			miniW,

			onResize,
			onMini,
			onToggle = () => true,
			...props
		},
		ref
	) {
		const innerRef = useRef();
		const handleRef = useForkRef(innerRef, ref);
		const ctx = useXLayoutContext();

		const isLayout = !!ctx;
		const isLeftSidebar = type === "left";

		const [
			{ isMounted, width, miniWidth, innerMini, isOpenBreakpoint },
			updateState,
		] = useObjectState({
			width: w,
			miniWidth: miniW,
			isOpenBreakpoint: false,
			isMounted: false,
			innerMini: mini,
		});

		const reverse = useMemo(() => type === "right", [type]);

		const belowBreakpoint = useBreakpoint(breakpoint, ctx?.width || 1000);

		const { isEvents, isMouseEvent, isOpen, isOverlay } = useMemo(
			() => ({
				isEvents: !belowBreakpoint && (miniMouse || miniToggle),
				isMouseEvent: belowBreakpoint && miniMouse && !miniToggle,
				isOpen: belowBreakpoint ? isOpenBreakpoint : open,
				isOverlay: overlay || (belowBreakpoint && miniOverlay),
			}),
			[belowBreakpoint, miniMouse, miniToggle, open, overlay, miniOverlay]
		);

		const { isMiniOverlay, isMini } = useMemo(
			() => ({
				isMiniOverlay:
					(miniOverlay || ((isEvents || mini) && overlay)) &&
					!belowBreakpoint,
				isMini: isEvents ? innerMini : mini && !belowBreakpoint,
			}),
			[miniOverlay, isEvents, innerMini, overlay, mini, belowBreakpoint]
		);

		const canResized = useMemo(
			() => resizeable && !isEvents && !isMini && !belowBreakpoint,
			[resizeable, isEvents, isMini, belowBreakpoint]
		);

		const containerStyle = useMemo(
			() => ({
				width:
					!isOpen || isOverlay
						? ""
						: isMiniOverlay || isMini
						? miniWidth
						: isOverlay
						? 0
						: width,
			}),
			[width, isOpen, isMini, isOverlay, miniWidth, isMiniOverlay]
		);

		const style = useMemo(
			() => ({
				width: isOpen
					? isMini
						? miniWidth
						: belowBreakpoint
						? w || ""
						: width
					: 0,
			}),
			[width, isOpen, isMini, belowBreakpoint, w]
		);

		useEffect(() => {
			if (innerRef.current) {
				if (typeof window !== "undefined") {
					const style = window.getComputedStyle(innerRef.current);
					const w = parseInt(style.width || 0, 10) || 0;
					const minWidth = parseInt(style.minWidth || 0, 10) || 0;
					//width ?? updateState({width: w});
					miniWidth ?? updateState({ miniWidth: minWidth });
				}
			}
		}, [innerRef]);

		useEffect(
			() =>
				updateState({
					isOpenBreakpoint: !isOpenBreakpoint,
				}),
			[open]
		);

		useEffect(
			() =>
				updateState({
					isOpenBreakpoint: false,
				}),
			[belowBreakpoint]
		);

		useEffect(() => {
			const handleClose = ({ target }) => {
				if (target.closest(".x-sidebar") !== innerRef.current) {
					updateState({
						innerMini: true,
						isOpenBreakpoint: false,
					});
				}
			};
			if (miniMouse && (miniToggle || belowBreakpoint)) {
				document.addEventListener("click", handleClose);
			}
			return () => {
				document.removeEventListener("click", handleClose);
			};
		}, [miniMouse, miniToggle, belowBreakpoint]);

		useEffect(() => onMini?.(isMini), [isMini]);

		const onHandleDrag = useCallback(
			(e, ui) => {
				updateState({
					width: Math.max(
						miniWidth,
						w + (reverse ? -ui.deltaX : ui.deltaX)
					),
				});
			},
			[reverse, miniWidth]
		);

		const onHandleDragEnd = useCallback(
			(e, ui) => {
				const width = Math.max(
					innerRef.current?.getBoundingClientRect().width,
					miniWidth
				);
				updateState({ width });
				onResize?.(width);
			},
			[innerRef.current, miniWidth]
		);

		const onMouseEnter = useCallback(
			(e) => {
				isMouseEvent && updateState({ innerMini: false });
			},
			[isMouseEvent]
		);

		const onMouseLeave = useCallback(
			(e) => {
				isMouseEvent && updateState({ innerMini: true });
			},
			[isMouseEvent]
		);

		const onHandleToggle = useCallback(() => {
			if (
				false ===
				onToggle?.({
					width,
					isOpen,
					isMini,
				})
			) {
				return;
			}
			updateState({
				isOpenBreakpoint: !isOpenBreakpoint,
			});
		}, [width, isOpen, isMini]);

		const onHandleMiniToggle = useCallback(() => {
			if (
				false ===
				onToggle?.({
					width,
					isOpen,
					isMini,
				})
			) {
				return;
			}
			updateState({ innerMini: !innerMini });
		}, [width, isOpen, isMini]);

		useEffect(() => {
			updateState({ isMounted: true });
			if (ctx && innerRef.current) {
				ctx.instances[type] = innerRef.current;
			}
			return () => {
				if (ctx) {
					delete ctx.instances[type];
				}
			};
		}, []);

		return (
			<>
				<XSidebarContext.Provider value={{ width, isMini, isOpen }}>
					<div
						className={classNames("x-sidebar-container", {
							"x-layout-sidebar": isLayout,
							[`x-layout-sidebar--${type}`]: isLayout && type,
							"x-sidebar--animate": !canResized,
						})}
						style={containerStyle}
						onMouseEnter={onMouseEnter}
						onMouseLeave={onMouseLeave}
					>
						<div
							className={classNames("x-sidebar", {
								"is-mounted": isMounted,
								"x-layout-sidebar": isLayout,
								[`x-layout-sidebar--${type}`]: isLayout && type,
								[`x-sidebar--${type}`]: type,
								"x-sidebar--toggle": miniToggle,
								"x-sidebar--mini": isMini,
								"x-sidebar--close": !isOpen,
								"x-sidebar--animate": !canResized,
								"x-sidebar--overlay": isOverlay,
								"x-sidebar--mini-overlay": isMiniOverlay,
							})}
							style={style}
							ref={handleRef}
						>
							<div
								className={classNames(
									"x-sidebar-content",
									className
								)}
							>
								{children}
							</div>
							{miniToggle && !belowBreakpoint && (
								<div className="x-sidebar-toggle-mini">
									<XBtn
										dimmed
										plain
										block
										square
										leftSection={
											isMini
												? `mdi-arrow-${
														isLeftSidebar
															? "right"
															: "left"
												  }-bold-box-outline`
												: `mdi-arrow-${type}-bold-box-outline`
										}
										onClick={onHandleMiniToggle}
										className="text-2xl py-0"
										title={
											isMini ? "Развернуть" : "Свернуть"
										}
									/>
								</div>
							)}
							{toggle && belowBreakpoint && (
								<div className="x-sidebar-toggle">
									<XBtn
										color="accent"
										rightSection={
											isOpen
												? `mdi-menu-${type}`
												: `mdi-menu-${
														isLeftSidebar
															? "right"
															: "left"
												  }`
										}
										onClick={onHandleToggle}
										className="text-2xl py-0"
										title={
											isOpen ? "Свернуть" : "Развернуть"
										}
									/>
								</div>
							)}
							{canResized && (
								<DraggableCore
									onDrag={onHandleDrag}
									onStop={onHandleDragEnd}
								>
									<div className="x-sidebar-res"></div>
								</DraggableCore>
							)}
						</div>
					</div>
				</XSidebarContext.Provider>
				{true && (
					<div className="fixed transition-all duration-200 ease-in-out bg-black/50 text-white w-54 -right-50 has-checked:right-0 hover:right-0 top-12 p-4 z-50">
						fre: <input type="checkbox" />
						<br />
						breakpoint: {breakpoint} - {ctx?.width}
						<br />
						isOpen: {isOpen ? "true" : "false"}
						<br />
						isMini: {isMini ? "true" : "false"}
						<br />
						isEvents: {isEvents ? "true" : "false"}
						<br />
						belowBreakpoint: {belowBreakpoint ? "true" : "false"}
						<br />
						isOverlay: {isOverlay ? "true" : "false"}
						<br />
						isMiniOverlay: {isMiniOverlay ? "true" : "false"}
						<br />
						isOpenBreakpoint: {isOpenBreakpoint ? "true" : "false"}
						<br />
						canResized: {canResized ? "true" : "false"}
						<br />
						isMouseEvent: {isMouseEvent ? "true" : "false"}
						<br />
						width: {width}
						<br />
						miniWidth: {miniWidth}
						<br />
						containerStyle: {JSON.stringify(containerStyle)}
						<br />
						style: {JSON.stringify(style)}
						<br />
					</div>
				)}
			</>
		);
	})
);

XSidebar.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
	type: PropTypes.oneOf(["left", "right"]),

	open: PropTypes.bool,
	w: PropTypes.number,
	overlay: PropTypes.bool,
	toggle: PropTypes.bool,

	breakpoint: PropTypes.number,

	mini: PropTypes.bool,
	miniW: PropTypes.number,
	miniMouse: PropTypes.bool,
	miniToggle: PropTypes.bool,
	miniOverlay: PropTypes.bool,

	resizeable: PropTypes.bool,

	onMini: PropTypes.func,
	onToggle: PropTypes.func,
	onResize: PropTypes.func,
};
