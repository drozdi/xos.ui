import classNames from "classnames";
import PropTypes from "prop-types";
import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
} from "react";
import { DraggableCore } from "react-draggable";
import { Resizable } from "react-resizable";
import { getComputedSize } from "../../../utils/domFns";
import { minMax } from "../../../utils/fns";
import { useApp } from "../../app/hooks/useApp";
import { useWM } from "../../apps/window-manager";
import { useId } from "../../hooks/useId";
import { Box } from "../../internal/box";
import { XBtn } from "../btn/XBtn";
import "./style.css";
import { XWindowProvider } from "./XWindowContext";

const changeHandle = {
	e(rect, dx) {
		return {
			width: rect.width - dx,
		};
	},
	w(rect, dx) {
		return {
			left: rect.left + dx,
			width: rect.width - dx,
		};
	},
	n(rect, dx, dy) {
		return {
			top: rect.top + dy,
			height: rect.height - dy,
		};
	},
	s(rect, dx, dy) {
		return {
			height: rect.height - dy,
		};
	},
	se(rect, dx, dy) {
		return Object.assign(
			changeHandle.s(rect, dx, dy),
			changeHandle.e(rect, dx, dy)
		);
	},
	sw(rect, dx, dy) {
		return Object.assign(
			changeHandle.s(rect, dx, dy),
			changeHandle.w(rect, dx, dy)
		);
	},
	ne(rect, dx, dy) {
		return Object.assign(
			changeHandle.n(rect, dx, dy),
			changeHandle.e(rect, dx, dy)
		);
	},
	nw(rect, dx, dy) {
		return Object.assign(
			changeHandle.n(rect, dx, dy),
			changeHandle.w(rect, dx, dy)
		);
	},
};

export const XWindow = forwardRef(function XWindowFn(
	{
		parent = document.body,
		aspectFactor,
		children,
		className,
		x = 0,
		y = 0,
		z,
		w = 300,
		h = 300,
		title,
		icons = "reload collapse fullscreen close",
		onReload = () => {},
		onClose = () => {},
		resizable = true,
		draggable = true,
		wmGroup,
		wmSort = 0,
	},
	ref
) {
	const uid = useId();
	const $app = useApp();
	const $sm = $app.sm("WINDOW");
	const wmStack = useWM();

	const [position, setPosition] = $sm.useState("position", {
		top: y,
		left: x,
		width: w,
		height: h,
		zIndex: z ?? wmStack.zIndex,
	});
	const [isFullscreen, setFullscreen] = $sm.useState("isFullscreen", false);
	const [isCollapse, setCollapse] = $sm.useState("isCollapse", false);
	const [active, setActive] = $sm.useState("active", false);

	const emit = useCallback((...args) => {
		$app?.emit?.(...args);
	}, []);

	const nodeRef = useRef();
	const contentRef = useRef();

	const style = useMemo(() => {
		return isFullscreen || isCollapse ? {} : position;
	}, [isFullscreen, isCollapse, position]);

	const canDo = useCallback((type) => icons.includes(type), [icons]);

	const onFullscreen = useCallback(
		(event) => {
			if (!canDo("fullscreen")) {
				return;
			}
			if (!isFullscreen) {
				setCollapse(false);
			}
			setFullscreen((v) => !v);
		},
		[canDo, isFullscreen]
	);
	const onCollapse = (event) => {
		setCollapse((v) => !v);
	};
	const handlerClose = useCallback((event) => {
		if (!canDo("close")) {
			return false;
		}
		emit("close", event);
		onClose(event);
	}, []);
	const handlerReload = useCallback((event) => {
		if (!canDo("reload")) {
			return false;
		}
		emit("reload", event);
		onReload(event);
	}, []);

	const onActive = useCallback(() => {
		wmStack?.active(win);
		win.z = wmStack.zIndex++;
		win.active = true;
		win.isCollapse = false;
	}, []);
	const onDeActive = (e) => {
		if (wmStack?.isActive(win)) {
			const target = event.target || event.srcElement;
			if (!nodeRef.current?.contains(target)) {
				if (win.active) {
					wmStack.disable();
					win.active = false;
				}
			}
		}
	};

	const onFocus = useCallback((event) => {
		emit("focus", event);
		if ($app?.emit) {
			emit("activated", event);
		} else {
			onActive(event);
		}
	}, []);
	const onBlur = useCallback((event) => {
		emit("blur", event);
		if ($app?.emit) {
			emit("deactivated", event);
		} else {
			onDeActive(event);
		}
	}, []);

	const mixIcons = useMemo(
		() => (
			<Box.Section
				top
				side
				row
				noPadding
				as={XBtn.Group}
				className="xWindow-drag-no"
				color="dark"
				size="sm"
				flat
				square
			>
				{(icons || "").split(/\s+/).map((type) => {
					if (type === "close") {
						return (
							<XBtn
								key={type}
								className={"bg-red-700/60 hover:bg-red-700/40"}
								leftSection="mdi-close"
								title="Закрыть"
								onClick={handlerClose}
							/>
						);
					} else if (type === "reload") {
						return (
							<XBtn
								key={type}
								leftSection="mdi-reload"
								title="Обновить"
								onClick={handlerReload}
							/>
						);
					} else if (type === "fullscreen") {
						return (
							<XBtn
								onClick={onFullscreen}
								key={type}
								leftSection={
									isFullscreen
										? "mdi-fullscreen-exit"
										: "mdi-fullscreen"
								}
								title={
									isFullscreen
										? "Свернуть в окно"
										: "Развернуть"
								}
							/>
						);
					} else if (type === "collapse") {
						return (
							<XBtn
								onClick={onCollapse}
								key={type}
								leftSection="mdi-window-minimize"
								title="Свернуть"
							/>
						);
					}
					return null;
				})}
			</Box.Section>
		),
		[icons, isFullscreen, onFullscreen]
	);

	const onDragStart = useCallback(() => {}, []);
	const onDragMove = useCallback(
		(e, { deltaX, deltaY }) => {
			!isFullscreen &&
				setPosition((v) => ({
					...v,
					top: v.top + deltaY,
					left: v.left + deltaX,
				}));
		},
		[isFullscreen]
	);
	const onDragStop = useCallback(() => {}, []);
	//
	const onResizeStart = useCallback(() => {}, []);
	const onResizeMove = useCallback((e, { handle, size }) => {
		setPosition((v) => ({
			...v,
			...changeHandle[handle](
				v,
				v.width - size.width,
				v.height - size.height
			),
		}));
	}, []);
	const onResizeStop = useCallback(() => {}, []);

	const win = useMemo(
		() => ({
			uid,
			wmGroup,
			wmSort,
			get position() {
				return position;
			},
			set position(value) {
				setPosition((v) => ({
					...v,
					...(value || {}),
				}));
			},
			get isFullscreen() {
				return isFullscreen;
			},
			set isFullscreen(val) {
				setFullscreen(val);
			},
			get isCollapse() {
				return isCollapse;
			},
			set isCollapse(val) {
				setCollapse(val);
			},
			get w() {
				return position.width;
			},
			set w(val) {
				if (!val) {
					return;
				}
				const pos = { ...position };
				if (isString(val) && val.substr(-1) === "%") {
					val = Math.ceil(
						(getComputedSize(parent)[0] * parseInt(val, 10)) / 100
					);
				}
				pos.width = minMax(val, 0, 10000);
				if (aspectFactor) {
					pos.height = pos.width * aspectFactor;
				}
				setPosition(pos);
			},
			get h() {
				return position.height;
			},
			set h(val) {
				if (!val) {
					return;
				}
				const pos = { ...position };
				if (isString(val) && val.substr(-1) === "%") {
					val = Math.ceil(
						(getComputedSize(parent)[1] * parseInt(val, 10)) / 100
					);
				}
				pos.height = minMax(val, 0, 10000);
				if (aspectFactor) {
					pos.width = pos.height / aspectFactor;
				}
				setPosition(pos);
			},
			get x() {
				return position.left;
			},
			set x(val) {
				const pos = { position };
				const [width] = getComputedSize(parent);
				if (val === "center") {
					pos.left = (width - pos.width) / 2;
				} else if (val === "right") {
					pos.left = width - pos.width;
				} else if (val === "left") {
					pos.left = 0;
				} else if (isString(val) && val.substr(-1) === "%") {
					pos.left = Math.ceil((width * parseInt(val, 10)) / 100);
				} else {
					pos.left = val;
				}
				setPosition(pos);
			},
			get y() {
				return position.top;
			},
			set y(val) {
				const pos = { ...position };
				const [, height] = getComputedSize(parent);
				if (val === "center") {
					pos.top = (height - pos.height) / 2;
				} else if (val === "bottom") {
					pos.top = height - pos.height;
				} else if (val === "top") {
					pos.top = 0;
				} else if (isString(val) && val.substr(-1) === "%") {
					pos.top = Math.ceil((height * parseInt(val, 10)) / 100);
				} else {
					pos.top = val;
				}
				setPosition(pos);
			},
			get z() {
				return position.zIndex;
			},
			set z(val) {
				setPosition((v) => ({ ...v, zIndex: val }));
			},
			get active() {
				return active;
			},
			set active(val) {
				setActive(val);
			},
			get content() {
				return contentRef.current;
			},
			get element() {
				return nodeRef.current;
			},
			get title() {
				return title;
			},
		}),
		[]
	);

	useImperativeHandle(ref, () => win);

	useEffect(() => {
		win.z = wmStack.zIndex = Math.max(
			wmStack.zIndex,
			parseInt(position.zIndex, 10) || 0
		);
		win.z = ++wmStack.zIndex;
		wmStack.setZIndex(win.z);
		wmStack.add(win);
		return () => $sm.remove();
	}, []);
	useEffect(() => {
		const onClick = (e) => {
			onDeActive(e);
		};
		document.documentElement.addEventListener("mousedown", onClick);
		return () => {
			document.documentElement.removeEventListener("mousedown", onClick);
		};
	}, []);
	useEffect(() => {
		$app?.on?.("activated", onActive);
		$app?.on?.("deactivated", onDeActive);
		return () => {
			$app?.off?.("activated", onActive);
			$app?.off?.("deactivated", onDeActive);
		};
	}, []);

	return (
		<XWindowProvider value={win}>
			<DraggableCore
				disabled={!draggable && isFullscreen}
				onDragStart={onDragStart}
				onDrag={onDragMove}
				onDragStop={onDragStop}
				handle=".xWindow-bar"
				cancel=".xWindow-res, .xWindow-drag-no"
				nodeRef={nodeRef}
			>
				<Resizable
					draggableOpts={{
						disabled: !resizable && (isFullscreen || isCollapse),
					}}
					width={position.width}
					height={position.height}
					onResizeStart={onResizeStart}
					onResize={onResizeMove}
					onResizeStop={onResizeStop}
					resizeHandles={["s", "w", "e", "n", "sw", "nw", "se", "ne"]}
					handle={(handleAxis, ref) => (
						<div
							className={`xWindow-res xWindow-res--${handleAxis}`}
							ref={ref}
						/>
					)}
				>
					<div
						className={classNames("xWindow", className, {
							"xWindow--active": active,
							"xWindow--resizable":
								resizable && !isFullscreen && !isCollapse,
							"xWindow--draggable": draggable && !isFullscreen,
							"xWindow--fullscreen": isFullscreen,
							"xWindow--collapse": isCollapse,
						})}
						style={style}
						ref={nodeRef}
						onClick={onActive}
					>
						<Box
							className="xWindow-bar"
							justify="between"
							onDoubleClick={onFullscreen}
						>
							{title && (
								<Box.Section side className="xWindow-title">
									{title}
								</Box.Section>
							)}
							{mixIcons}
						</Box>

						<div className="xWindow-content" ref={contentRef}>
							{children}
						</div>
					</div>
				</Resizable>
			</DraggableCore>
		</XWindowProvider>
	); //*/
});

XWindow.propTypes = {
	parent: PropTypes.any,
	children: PropTypes.node,
	className: PropTypes.string,
	x: PropTypes.number,
	y: PropTypes.number,
	z: PropTypes.number,
	w: PropTypes.number,
	h: PropTypes.number,
	title: PropTypes.string,
	icons: PropTypes.string,
	onReload: PropTypes.func,
	onClose: PropTypes.func,
	resizable: PropTypes.bool,
	draggable: PropTypes.bool,
	wmGroup: PropTypes.string,
	wmSort: PropTypes.number,
};
