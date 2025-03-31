import classNames from "classnames";
import PropTypes from "prop-types";
import {
	cloneElement,
	memo,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
} from "react";
import { DraggableCore } from "react-draggable";
import { Resizable } from "react-resizable";
import { useId } from "../../shared/hooks/use-id";
import { Box } from "../../shared/internal/box";
import { forwardRefWithAs } from "../../shared/internal/render";
import { XBtn } from "../../shared/ui/btn/XBtn";
import { isString } from "../../shared/utils//is";
import { getComputedSize } from "../../shared/utils/domFns";
import { minMax } from "../../shared/utils/fns";
import { useApp } from "../app";
import { wmStore } from "../window-manager";
import "./style.css";
import { WindowProvider } from "./WindowContext";

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

export const Window = memo(
	forwardRefWithAs(function WindowFn(
		{
			parent = document.body,
			aspectFactor,
			children,
			className,
			x,
			y,
			z,
			w,
			h,
			title,
			icons = "close",
			//icons = "reload collapse fullscreen close",
			onFullscreen,
			onCollapse,
			onReload,
			onClose,
			resizable,
			draggable,
			wmGroup,
			wmSort = 0,
			tabIndex = -1,
		},
		ref
	) {
		const uid = useId();
		const $app = useApp();
		const $sm = $app.sm("WINDOW");

		const wm = wmStore();

		const [position, setPosition] = $sm.useState("position", {
			left: x,
			top: y,
			width: w,
			height: h,
			zIndex: z,
		});
		//??? error DevTools
		const [{ isFullscreen, isCollapse, isActive }, updateState] =
			$sm.useStateObject("state", {});

		const active = useMemo(
			() => wm.isActive?.({ uid }) ?? isActive,
			[wm.isActive, uid, isActive]
		);

		const emit = useCallback(
			(...args) => {
				$app?.emit?.(...args);
			},
			[$app]
		);
		const nodeRef = useRef();
		const contentRef = useRef();

		// Обработчик полного экрана
		const handleFullscreen = useCallback(() => {
			if (!resizable) return;
			const newState = !isFullscreen;
			updateState({ isFullscreen: newState, isCollapse: false });
			onFullscreen?.(newState);
		}, [isFullscreen, resizable, onFullscreen]);

		// Обработчик свернуть экрана
		const handleCollapse = useCallback(() => {
			const newState = !isCollapse;
			updateState({
				isCollapse: newState,
				isActive: newState ? false : isActive,
			});
			if (newState) {
				wm?.disable?.();
			}
			onCollapse?.(newState);
		}, [isCollapse, isActive, onCollapse]);

		// Обработчик закрыть экрана
		const handleClose = useCallback(
			(event) => {
				emit("close", event);
				onClose?.(event);
			},
			[onClose]
		);

		// Обработчик обновить
		const handleReload = useCallback(
			(event) => {
				emit("reload", event);
				onReload?.(event);
			},
			[onReload]
		);

		// Обработчик размера окна
		const handleResize = useCallback((e, { handle, size }) => {
			setPosition((v) => ({
				...v,
				...changeHandle[handle](
					v,
					v.width - size.width,
					v.height - size.height
				),
			}));
		}, []);

		// Обработчик перетаскивания окна
		const handleDrag = useCallback((e, { deltaX, deltaY }) => {
			setPosition((v) => ({
				...v,
				top: v.top + deltaY,
				left: v.left + deltaX,
			}));
		}, []);

		const onActive = useCallback(
			(event) => {
				if (!active) {
					setTimeout(() => {
						wm.setZIndex?.(wm.zIndex + 2);
						wm.active?.({ uid });
						setPosition((v) => ({ ...v, zIndex: wm.zIndex }));
						emit("focus", event);
						emit("activated", event);
						updateState({ isActive: true, isCollapse: false });
					}, 0);
				}
			},
			[updateState, setPosition, active, uid, wm]
		);
		const onDeActive = useCallback(
			(event) => {
				if (active && !nodeRef.current?.contains(event.target)) {
					wm.disable();
					emit("blur", event);
					emit("deactivated", event);
				}
				updateState({ isActive: false });
			},
			[nodeRef.current, active, uid, updateState, title]
		);

		const win = useMemo(
			() => ({
				__: "window",
				uid,
				wmGroup,
				wmSort,

				get isFullscreen() {
					return isFullscreen;
				},
				set isFullscreen(isFullscreen) {
					updateState({ isFullscreen });
				},
				get isCollapse() {
					return isCollapse;
				},
				set isCollapse(isCollapse) {
					updateState({ isCollapse });
				},
				get isActive() {
					return active;
				},
				set isActive(isActive) {
					if (isActive) {
						wm?.active?.({ uid });
						emit("activated");
					} else {
						wm?.disable?.();
						emit("deactivated");
					}
					updateState((v) => ({
						isActive,
						isCollapse: isActive ? false : v.isCollapse,
					}));
				},
				get position() {
					return position;
				},
				set position(value) {
					setPosition((v) => ({
						...v,
						...(value || {}),
					}));
				},
				get w() {
					return position.width;
				},
				set w(val) {
					if (!val) {
						return;
					}
					setPosition((pos) => {
						if (isString(val) && val.substr(-1) === "%") {
							val = Math.ceil(
								(getComputedSize(parent)[0] *
									parseInt(val, 10)) /
									100
							);
						}
						pos.width = minMax(val, 0, 10000);
						if (aspectFactor) {
							pos.height = pos.width * aspectFactor;
						}
						return { ...pos };
					});
				},
				get h() {
					return position.height;
				},
				set h(val) {
					if (!val) {
						return;
					}
					setPosition((pos) => {
						if (isString(val) && val.substr(-1) === "%") {
							val = Math.ceil(
								(getComputedSize(parent)[1] *
									parseInt(val, 10)) /
									100
							);
						}
						pos.height = minMax(val, 0, 10000);
						if (aspectFactor) {
							pos.width = pos.height / aspectFactor;
						}
						return { ...pos };
					});
				},
				get x() {
					return position.left;
				},
				set x(val) {
					setPosition((pos) => {
						const [width] = getComputedSize(parent);
						if (val === "center") {
							pos.left = (width - pos.width) / 2;
						} else if (val === "right") {
							pos.left = width - pos.width;
						} else if (val === "left") {
							pos.left = 0;
						} else if (isString(val) && val.substr(-1) === "%") {
							pos.left = Math.ceil(
								(width * parseInt(val, 10)) / 100
							);
						} else {
							pos.left = val;
						}
						return { ...pos };
					});
				},
				get y() {
					return position.top;
				},
				set y(val) {
					setPosition((pos) => {
						const [, height] = getComputedSize(parent);
						if (val === "center") {
							pos.top = (height - pos.height) / 2;
						} else if (val === "bottom") {
							pos.top = height - pos.height;
						} else if (val === "top") {
							pos.top = 0;
						} else if (isString(val) && val.substr(-1) === "%") {
							pos.top = Math.ceil(
								(height * parseInt(val, 10)) / 100
							);
						} else {
							pos.top = val;
						}
						return { ...pos };
					});
				},
				get z() {
					return position.zIndex;
				},
				set z(zIndex) {
					setPosition((v) => ({ ...v, zIndex: wm.zIndex }));
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
				focus: onActive,
				blur: onDeActive,
			}),
			[
				uid,
				wmGroup,
				wmSort,
				position,
				isCollapse,
				isFullscreen,
				active,
				nodeRef.current,
				contentRef.current,
				aspectFactor,
				title,
				parent,
				updateState,
				setPosition,
				onDeActive,
				onActive,
			]
		);

		const style = useMemo(() => {
			return isFullscreen || isCollapse
				? {
						zIndex: position.zIndex,
				  }
				: position;
		}, [isFullscreen, isCollapse, position]);

		useImperativeHandle(ref, () => win);

		useEffect(() => {
			document.documentElement.addEventListener("click", onDeActive);
			return () => {
				document.documentElement.removeEventListener(
					"click",
					onDeActive
				);
			};
		}, [onDeActive]);

		useEffect(() => {
			$sm.active = true;
			win.z = wm.zIndex = Math.max(wm.zIndex, position.zIndex);
			wm.setZIndex?.(wm.zIndex);
			wm.add?.(win);

			active && wm.active?.(win);

			$sm.first(() => {
				if (w) win.w = w;
				if (h) win.h = h;
				if (x) win.x = x;
				if (y) win.y = y;
			});

			return () => {
				wm.disable?.();
				wm.del?.(win);
				$sm.remove();
			};
		}, []);

		useEffect(() => {
			/*const onActive = (event) => {
				setTimeout(() => {
					wm.setZIndex?.(wm.zIndex + 2);
					wm.active?.({ uid });
					setPosition((v) => ({ ...v, zIndex: wm.zIndex }));
				}, 0);
			};
			const onDeActive = (event) => {
				if (active && !nodeRef.current?.contains(event.target)) {
					wm.disable();
				}
			};*/
			$app?.register(win);
			//$app?.on("activated", onActive);
			//$app?.on("deactivated", onDeActive);
			return () => {
				//$app?.off("activated", onActive);
				//$app?.off("deactivated", onDeActive);
				$app?.unRegister(win);
			};
		}, []);

		const mixinDraggable = useCallback(
			(child, disabled) => (
				<DraggableCore
					disabled={disabled}
					onDrag={handleDrag}
					handle=".xWindow-bar"
					cancel=".xWindow-res, .xWindow-drag-no"
					nodeRef={nodeRef}
				>
					{child}
				</DraggableCore>
			),
			[handleDrag]
		);

		const mixinResizable = useCallback(
			(child, disabled) => (
				<Resizable
					width={position.width}
					height={position.height}
					onResize={handleResize}
					draggableOpts={{ disabled }}
					resizeHandles={
						!disabled
							? ["s", "w", "e", "n", "sw", "nw", "se", "ne"]
							: []
					}
					handle={(axis, ref) => (
						<div
							className={`xWindow-res xWindow-res--${axis}`}
							ref={ref}
						/>
					)}
				>
					{child}
				</Resizable>
			),
			[handleResize, position.width, position.height]
		);

		const newChild = (
			<div
				id={uid}
				className={classNames("xWindow", className, {
					"xWindow--active": active,
					"xWindow--resizable":
						resizable && !isFullscreen && !isCollapse,
					"xWindow--draggable": draggable && !isFullscreen,
					"xWindow--fullscreen": isFullscreen,
					"xWindow--collapse": isCollapse,
				})}
				style={style}
				onClick={onActive}
				ref={nodeRef}
			>
				<Box
					className="xWindow-bar"
					justify="between"
					onDoubleClick={handleFullscreen}
				>
					{title && (
						<Box.Section side className="xWindow-title">
							{title}
						</Box.Section>
					)}
					<WindowIcons
						icons={icons}
						isFullscreen={isFullscreen}
						onFullscreen={handleFullscreen}
						onCollapse={handleCollapse}
						onClose={handleClose}
						onReload={handleReload}
						resizable={resizable}
					/>
				</Box>

				<div className="xWindow-content" ref={contentRef}>
					{children}
				</div>
			</div>
		);

		return (
			<WindowProvider value={win}>
				{mixinDraggable(
					mixinResizable(
						newChild,
						!resizable || isFullscreen || isCollapse
					),
					!draggable || isFullscreen
				)}
			</WindowProvider>
		); //*/
	})
);

Window.propTypes = {
	parent: PropTypes.any,
	children: PropTypes.node,
	className: PropTypes.string,
	aspectFactor: PropTypes.number,
	x: PropTypes.number,
	y: PropTypes.number,
	z: PropTypes.number,
	w: PropTypes.number,
	h: PropTypes.number,
	title: PropTypes.string,
	icons: PropTypes.string,
	onFullscreen: PropTypes.func,
	onCollapse: PropTypes.func,
	onReload: PropTypes.func,
	onClose: PropTypes.func,
	resizable: PropTypes.bool,
	draggable: PropTypes.bool,
	wmGroup: PropTypes.string,
	wmSort: PropTypes.number,
};

const WindowIcons = memo(
	({
		icons,
		isFullscreen,
		onFullscreen = () => {},
		onCollapse = () => {},
		onClose = () => {},
		onReload = () => {},
		resizable,
	}) => (
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
			{icons.split(/\s+/).map((type) => {
				switch (type) {
					case "close":
						return (
							<XBtn
								key={type}
								className="bg-red-700/60"
								leftSection="mdi-close"
								title="Закрыть"
								onClick={onClose}
							/>
						);
					case "reload":
						return (
							<XBtn
								key={type}
								leftSection="mdi-reload"
								title="Обновить"
								onClick={onReload}
							/>
						);
					case "fullscreen":
						return (
							resizable && (
								<XBtn
									key={type}
									onClick={onFullscreen}
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
							)
						);
					case "collapse":
						return (
							<XBtn
								key={type}
								onClick={onCollapse}
								leftSection="mdi-window-minimize"
								title="Свернуть"
							/>
						);
					default:
						return null;
				}
			})}
		</Box.Section>
	)
);
WindowIcons.displayName = "./features/WindowIcons";
WindowIcons.propTypes = {
	icons: PropTypes.string,
	resizable: PropTypes.bool,
	isFullscreen: PropTypes.bool,
	onFullscreen: PropTypes.func,
	onCollapse: PropTypes.func,
	onClose: PropTypes.func,
	onReload: PropTypes.func,
};

// думать
const ResizableWrapper = memo(
	({ width, height, onResize, disabled, children }) => (
		<Resizable
			width={width}
			height={height}
			onResize={onResize}
			draggableOpts={{ disabled }}
			resizeHandles={
				!disabled ? ["s", "w", "e", "n", "sw", "nw", "se", "ne"] : []
			}
			handle={(axis, ref) => (
				<div className={`xWindow-res xWindow-res--${axis}`} ref={ref} />
			)}
		>
			{children}
		</Resizable>
	)
);
ResizableWrapper.displayName = "./features/ResizableWrapper";
ResizableWrapper.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	onResize: PropTypes.func,
	disabled: PropTypes.bool,
	children: PropTypes.node,
};

const DraggableWrapper = memo(({ disabled, onDrag, children }) => {
	const ref = useRef();
	return (
		<DraggableCore
			disabled={disabled}
			onDrag={onDrag}
			handle=".xWindow-bar"
			cancel=".xWindow-res, .xWindow-drag-no"
			nodeRef={ref}
		>
			{cloneElement(children, { ref })}
		</DraggableCore>
	);
});

DraggableWrapper.displayName = "./features/DraggableWrapper";
DraggableWrapper.propTypes = {
	disabled: PropTypes.bool,
	onDrag: PropTypes.func,
	children: PropTypes.node,
	nodeRef: PropTypes.any,
};
