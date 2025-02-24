import classNames from "classnames";
import PropTypes from "prop-types";
import { forwardRef, useCallback, useMemo, useRef, useState } from "react";
import { DraggableCore } from "react-draggable";
import { Resizable } from "react-resizable";
import { Box } from "../../internal/box";
import { XBtn } from "../btn/XBtn";
import "./style.css";

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
		children,
		className,
		x = 0,
		y = 0,
		w = 300,
		h = 300,
		title,
		icons = "reload collapse fullscreen close",
		onReload = () => {},
		onClose = () => {},
		resizable = true,
		draggable = true,
	},
	ref
) {
	const nodeRef = useRef();
	const [position, setPosition] = useState({
		top: y,
		left: x,
		width: w,
		height: h,
	});
	const [isFullscreen, setFullscreen] = useState(false);
	const [isCollapse, setCollapse] = useState(false);

	const canDo = useCallback((type) => icons.includes(type), [icons]);

	const style = useMemo(() => {
		return isFullscreen || isCollapse ? {} : position;
	}, [isFullscreen, isCollapse, position]);

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
							/>
						);
					} else if (type === "reload") {
						return (
							<XBtn
								key={type}
								leftSection="mdi-reload"
								title="Обновить"
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
	return (
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
						"xWindow--resizable":
							resizable && !isFullscreen && !isCollapse,
						"xWindow--draggable": draggable && !isFullscreen,
						"xWindow--fullscreen": isFullscreen,
						"xWindow--collapse": isCollapse,
					})}
					style={style}
					ref={nodeRef}
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

					<div className="xWindow-content">{children}</div>
				</div>
			</Resizable>
		</DraggableCore>
	); //*/
});

XWindow.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	x: PropTypes.number,
	y: PropTypes.number,
	w: PropTypes.number,
	h: PropTypes.number,
	title: PropTypes.string,
	icons: PropTypes.string,
	onReload: PropTypes.func,
	onClose: PropTypes.func,
	resizable: PropTypes.bool,
	draggable: PropTypes.bool,
};
