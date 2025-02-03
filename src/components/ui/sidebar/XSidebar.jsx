import classNames from "classnames";
import PropTypes from "prop-types";
import React, {
	memo,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

import { DraggableCore } from "react-draggable";
import { useForkRef } from "../../hooks/useForkRef";
import { forwardRefWithAs } from "../../internal/render";
import { XBtn } from "../btn/XBtn";
import { XLayoutContext } from "../layout";
import "./style.css";
import { XSidebarContext } from "./XSidebarContext";

const XSidebarRoot = forwardRefWithAs(function XSidebarFn(
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
		onToggle,
	},
	externalRef
) {
	const ref = useRef();
	const handleRef = useForkRef(externalRef, ref);
	const { $layout, $update } = useContext(XLayoutContext);
	const isLayout = useMemo(() => !!$layout, [$layout]);

	const [width, setWidth] = useState(w);
	const [miniWidth, setMiniWidth] = useState(miniW);
	const [isOpenBreakpoint, setOpenBreakpoint] = useState(false);
	const [isMounted, setMounted] = useState(false);

	const [innerMini, setInnerMini] = useState(mini);

	const reverse = useMemo(() => type === "right", [type]);
	const belowBreakpoint = useMemo(
		() => (breakpoint && isLayout && $layout?.width < breakpoint) || false,
		[$layout, breakpoint, isLayout]
	);
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
		() => resizeable && !innerEvents && !isMini && !belowBreakpoint,
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
		[width, isOpen, isMini, canResized, isOverlay, miniWidth, isMiniOverlay]
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
		[width, isOpen, isMini, belowBreakpoint]
	);

	useEffect(() => {
		if (ref.current) {
			const style = window.getComputedStyle(ref.current);
			const w = parseInt(style.width || 0, 10) || 0;
			const minWidth = parseInt(style.minWidth || 0, 10) || 0;
			width ?? setWidth(w);
			miniWidth ?? setMiniWidth(minWidth);
		}
	}, [ref.current]);
	useEffect(() => setOpenBreakpoint((v) => !v), [open]);
	useEffect(() => setOpenBreakpoint(false), [belowBreakpoint]);

	useEffect(() => {
		const handleClose = ({ target }) => {
			if (target.closest(".xSidebar") !== ref.current) {
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

	useEffect(() => onMini(isMini), [isMini]);

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
				ref.current?.getBoundingClientRect().width,
				miniWidth
			);
			setWidth(width);
			onResize(width);
		},
		[ref.current, miniWidth]
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
			onToggle({
				width,
				isOpen,
				isMini,
			})
		) {
			return;
		}
		setOpenBreakpoint((v) => !v);
	}, [onToggle]);

	const onHandleMiniToggle = useCallback(() => {
		if (
			false ===
			onToggle({
				width,
				isOpen,
				isMini,
			})
		) {
			return;
		}
		setInnerMini((m) => !m);
	}, [onToggle]);
	useEffect(() => setMounted(true), []);
	return (
		<>
			<XSidebarContext.Provider value={{ width, isMini, isOpen }}>
				<div
					className={classNames("xSidebar-container", {
						"xLayout-sidebar": isLayout,
						[`xLayout-sidebar--${type}`]: isLayout && type,
						"xSidebar--animate": !canResized,
					})}
					style={containerStyle}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
				>
					<div
						className={classNames("xSidebar", {
							"is-mounted": isMounted,
							"xLayout-sidebar": isLayout,
							[`xLayout-sidebar--${type}`]: isLayout && type,
							[`xSidebar--${type}`]: type,
							"xSidebar--toggle": miniToggle,
							"xSidebar--mini": isMini,
							"xSidebar--close": !isOpen,
							"xSidebar--animate": !canResized,
							"xSidebar--overlay": isOverlay,
							"xSidebar--mini-overlay": isMiniOverlay,
						})}
						style={style}
						ref={handleRef}
					>
						<div
							className={classNames(
								"xSidebar-content",
								className
							)}
						>
							{children}
						</div>
						{miniToggle && !belowBreakpoint && (
							<div className="xSidebar-toggle-mini">
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
									title={isMini ? "Развернуть" : "Свернуть"}
								/>
							</div>
						)}
						{toggle && belowBreakpoint && (
							<div className="xSidebar-toggle">
								<XBtn
									color="accent"
									leftSection={
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
									title={isOpen ? "Свернуть" : "Развернуть"}
								/>
							</div>
						)}
						{canResized && (
							<DraggableCore
								onDrag={onHandleDrag}
								onStop={onHandleDragEnd}
							>
								<div className="xSidebar-res"></div>
							</DraggableCore>
						)}
					</div>
				</div>
			</XSidebarContext.Provider>
			{false && (
				<div className="fixed bg-black/50 text-white right-0 top-12 p-4 z-10">
					breakpoint: {breakpoint} - {$layout.width}
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
});

XSidebarRoot.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
	type: PropTypes.string,
	mini: PropTypes.bool,
	miniOverlay: PropTypes.bool,
	miniToggle: PropTypes.bool,
	miniMouse: PropTypes.bool,
	miniW: PropTypes.number,
	open: PropTypes.bool,
	overlay: PropTypes.bool,
	toggle: PropTypes.bool,
	breakpoint: PropTypes.number,

	w: PropTypes.number,

	resizeable: PropTypes.bool,

	onResize: PropTypes.func,
	onMini: PropTypes.func,
	onToggle: PropTypes.func,
};
XSidebarRoot.defaultProps = {
	children: "",
	className: "",
	w: 256,
	type: "left",
	mini: false,
	miniOverlay: false,
	miniToggle: false,
	miniMouse: false,
	miniW: undefined,
	open: false,
	overlay: false,
	toggle: false,

	breakpoint: null,
	resizeable: false,
	onResize: () => {},
	onMini: () => {},
	onToggle: () => {},
};

export const XSidebar = memo(XSidebarRoot);
