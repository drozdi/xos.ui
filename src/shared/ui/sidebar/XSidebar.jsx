import classNames from "classnames";
import PropTypes from "prop-types";
import React, {
	memo,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

import { DraggableCore } from "react-draggable";
import { useForkRef } from "../../hooks/use-fork-ref";
import { forwardRefWithAs } from "../../internal/render";
import { XBtn } from "../btn/XBtn";
import { useXLayoutContext } from "../layout";
import "./style.css";
import { XSidebarContext } from "./XSidebarContext";

/**
 *
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

		const [width, setWidth] = useState(w);
		const [miniWidth, setMiniWidth] = useState(miniW);
		const [isOpenBreakpoint, setOpenBreakpoint] = useState(false);
		const [isMounted, setMounted] = useState(false);

		const [innerMini, setInnerMini] = useState(mini);

		const reverse = useMemo(() => type === "right", [type]);

		const belowBreakpoint = useBreakpoint(breakpoint, ctx.width);

		const innerEvents = useMemo(
			() => !belowBreakpoint && (miniMouse || miniToggle),
			[belowBreakpoint, miniMouse, miniToggle]
		);
		const isMouseEvent = useMemo(
			() => !belowBreakpoint && miniMouse && !miniToggle,
			[belowBreakpoint, miniMouse, miniToggle]
		);

		const isOpen = useMemo(
			() => (belowBreakpoint ? isOpenBreakpoint : open),
			[belowBreakpoint, isOpenBreakpoint, open]
		);
		const isMini = useMemo(
			() => (innerEvents ? innerMini : mini && !belowBreakpoint),
			[innerEvents, innerMini, mini, belowBreakpoint]
		);

		const isOverlay = useMemo(
			() => overlay || (belowBreakpoint && miniOverlay),
			[overlay, belowBreakpoint, miniOverlay]
		);

		const isMiniOverlay = useMemo(
			() =>
				(miniOverlay || ((innerEvents || mini) && overlay)) &&
				!belowBreakpoint,
			[miniOverlay, innerEvents, overlay, mini, belowBreakpoint]
		);

		const canResized = useMemo(
			() =>
				false &&
				resizeable &&
				!innerEvents &&
				!isMini &&
				!belowBreakpoint,
			[resizeable, innerEvents, isMini, belowBreakpoint]
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
				const style = window.getComputedStyle(innerRef.current);
				const w = parseInt(style.width || 0, 10) || 0;
				const minWidth = parseInt(style.minWidth || 0, 10) || 0;
				//width ?? setWidth(w);
				miniWidth ?? setMiniWidth(minWidth);
			}
		}, [innerRef]);
		useEffect(() => setOpenBreakpoint((v) => !v), [open]);
		useEffect(() => setOpenBreakpoint(false), [belowBreakpoint]);

		useEffect(() => {
			const handleClose = ({ target }) => {
				if (target.closest(".x-sidebar") !== innerRef.current) {
					setInnerMini(true);
					setOpenBreakpoint(false);
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
				setWidth((w) =>
					Math.max(miniWidth, w + (reverse ? -ui.deltaX : ui.deltaX))
				);
			},
			[reverse, miniWidth]
		);
		const onHandleDragEnd = useCallback(
			(e, ui) => {
				const width = Math.max(
					innerRef.current?.getBoundingClientRect().width,
					miniWidth
				);
				setWidth(width);
				onResize?.(width);
			},
			[innerRef.current, miniWidth]
		);
		const onMouseEnter = useCallback(
			(e) => {
				isMouseEvent && setInnerMini(false);
			},
			[isMouseEvent]
		);
		const onMouseLeave = useCallback(
			(e) => {
				isMouseEvent && setInnerMini(true);
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
			setOpenBreakpoint((v) => !v);
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
			setInnerMini((m) => !m);
		}, [width, isOpen, isMini]);
		useEffect(() => {
			setMounted(true);
			if (innerRef.current) {
				ctx.instances[type] = innerRef.current;
			}
			return () => {
				delete ctx.instances[type];
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
														type === "left"
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
														type === "left"
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
						breakpoint: {breakpoint} - {ctx.width}
						<br />
						isOpen: {isOpen ? "true" : "false"}
						<br />
						isMini: {isMini ? "true" : "false"}
						<br />
						isOverlay: {isOverlay ? "true" : "false"}
						<br />
						isMiniOverlay: {isMiniOverlay ? "true" : "false"}
						<br />
						belowBreakpoint: {belowBreakpoint ? "true" : "false"}
						<br />
						isOpenBreakpoint: {isOpenBreakpoint ? "true" : "false"}
						<br />
						canResized: {canResized ? "true" : "false"}
						<br />
						innerEvents: {innerEvents ? "true" : "false"}
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
