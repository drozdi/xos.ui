import classNames from "classnames";
import PropTypes from "prop-types";
import { Component } from "react";
import { DraggableCore } from "react-draggable";
import { Resizable } from "react-resizable";
import { getComputedSize } from "../../../utils/domFns";
import { minMax } from "../../../utils/fns";
import { isString } from "../../../utils/is";
import { AppContext } from "../../app";
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

export class XWindow extends Component {
	static contextType = AppContext;
	static propTypes = {
		parent: PropTypes.any,
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
	static defaultProps = {
		parent: document.body,
		children: "",
		className: "",
		x: 0,
		y: 0,
		w: 300,
		h: 300,
		title: "",
		icons: "reload collapse fullscreen close",
		onReload: () => {},
		onClose: () => {},
		resizable: true,
		draggable: true,
	};
	state = {
		isFullscreen: false,
		isCollapsed: false,
		active: true,
		position: {
			top: this.props.y,
			left: this.props.x,
			width: this.props.w,
			height: this.props.h,
		},
	};
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		if ((this.$s = this.context?.$sm("WINDOW"))) {
			this.isFullscreen = this.$s.get("isFullscreen", false);
			this.isCollapsed = this.$s.get("isCollapsed", false);
			this.position = this.$s.get("position");
			this.$s.active = true;
		}
	}
	componentWillUnmount() {
		this.$s && this.$s.remove();
	}

	onDragStart = () => {};
	onDragMove = (e, { deltaX, deltaY }) => {
		if (!this.state.isFullscreen) {
			this.position = {
				top: this.position.top + deltaY,
				left: this.position.left + deltaX,
			};
		}
	};
	onDragStop = () => {};
	onResizeStart = () => {};
	onResizeMove = (e, { handle, size }) => {
		this.position = changeHandle[handle](
			this.state.position,
			this.state.position.width - size.width,
			this.state.position.height - size.height
		);
	};
	onResizeStop = () => {};

	canDo = (type) => {
		return this.props.icons.includes(type);
	};
	onFullscreen = (event) => {
		if (!this.canDo("fullscreen")) {
			return;
		}
		if (!this.state.isFullscreen) {
			this.isCollapsed = false;
		}
		this.isFullscreen = !this.isFullscreen;
	};
	onCollapse = (event) => {
		this.isCollapsed = !this.isCollapsed;
	};
	get mixIcon() {
		return (
			<div className="xWindow-drag-no">
				{(this.props.icons || "").split(/\s+/).map((type) => {
					if (type === "close") {
						return (
							<XBtn
								key={type}
								className={"bg-red-700/60 hover:bg-red-700/40"}
								color="dark"
								size="sm"
								icon="mdi-close"
								flat={true}
								tonal={true}
								square={true}
								title="Закрыть"
							/>
						);
					} else if (type === "reload") {
						return (
							<XBtn
								key={type}
								color="dark"
								size="sm"
								icon="mdi-reload"
								flat={true}
								tonal={true}
								square={true}
								title="Обновить"
							/>
						);
					} else if (type === "fullscreen") {
						return (
							<XBtn
								onClick={this.onFullscreen}
								key={type}
								color="dark"
								size="sm"
								icon={
									this.state.isFullscreen
										? "mdi-fullscreen-exit"
										: "mdi-fullscreen"
								}
								flat={true}
								tonal={true}
								square={true}
								title={
									this.state.isFullscreen
										? "Свернуть в окно"
										: "Развернуть"
								}
							/>
						);
					} else if (type === "collapse") {
						return (
							<XBtn
								onClick={this.onCollapse}
								key={type}
								color="dark"
								size="sm"
								icon="mdi-window-minimize"
								flat={true}
								tonal={true}
								square={true}
								title="Свернуть"
							/>
						);
					}
					return null;
				})}
			</div>
		);
	}

	get position() {
		return this.state.position;
	}
	set position(value) {
		this.setState((v) => ({
			...v,
			position: this.$s.set("position", {
				...v.position,
				...(value || {}),
			}),
		}));
	}

	get isFullscreen() {
		return this.state.isFullscreen;
	}
	set isFullscreen(val) {
		this.setState((v) => ({
			...v,
			isFullscreen: this.$s.set("isFullscreen", val),
		}));
	}

	get isCollapsed() {
		return this.state.isCollapsed;
	}
	set isCollapsed(val) {
		this.setState((v) => ({
			...v,
			isCollapsed: this.$s.set("isCollapsed", val),
		}));
	}

	get x() {
		return this.state.position.left;
	}
	set x(val) {
		const { parent } = this.props;
		const pos = { ...this.position };
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
		this.position = pos;
	}
	get y() {
		return this.state.position.top;
	}
	set y(val) {
		const { parent } = this.props;
		const pos = { ...this.position };
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
		this.position = pos;
	}

	get w() {
		return this.state.position.width;
	}
	set w(val) {
		if (!val) {
			return;
		}
		const { aspectFactor, parent } = this.props;
		const pos = { ...this.position };
		if (isString(val) && val.substr(-1) === "%") {
			val = Math.ceil(
				(getComputedSize(parent)[0] * parseInt(val, 10)) / 100
			);
		}
		pos.width = minMax(val, 0, 10000);
		if (aspectFactor) {
			//pos.height = pos.width * aspectFactor;
		}
		this.position = pos;
	}
	get h() {
		return this.state.position.height;
	}
	set h(val) {
		if (!val) {
			return;
		}
		const { aspectFactor, parent } = this.props;
		const pos = { ...this.position };
		if (isString(val) && val.substr(-1) === "%") {
			val = Math.ceil(
				(getComputedSize(parent)[1] * parseInt(val, 10)) / 100
			);
		}
		pos.height = minMax(val, 0, 10000);
		if (aspectFactor) {
			//pos.width = pos.height / aspectFactor;
		}
		this.position = pos;
	}
	get active() {
		return this.state.active;
	}
	set active(val) {
		this.setState((v) => ({
			...v,
			active: val,
		}));
	}

	get style() {
		return this.state.isFullscreen || this.state.isCollapsed
			? {}
			: this.state.position;
	}

	render() {
		const { draggable, resizable, title, className, children } = this.props;
		const { position, isFullscreen, isCollapsed, active } = this.state;
		return (
			<DraggableCore
				disabled={!draggable && isFullscreen}
				onDragStart={this.onDragStart}
				onDrag={this.onDragMove}
				onDragStop={this.onDragStop}
				handle=".xWindow-bar"
				cancel=".xWindow-res, .xWindow-drag-no"
			>
				<Resizable
					draggableOpts={{
						disabled: !resizable && (isFullscreen || isCollapsed),
					}}
					width={position.width}
					height={position.height}
					onResizeStart={this.onResizeStart}
					onResize={this.onResizeMove}
					onResizeStop={this.onResizeStop}
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
								resizable && !isFullscreen && !isCollapsed,
							"xWindow--draggable": draggable && !isFullscreen,
							"xWindow--fullscreen": isFullscreen && !isCollapsed,
							"xWindow--collapsed": isCollapsed,
						})}
						style={this.style}
					>
						<div
							className="xWindow-bar"
							onDoubleClick={this.onFullscreen}
						>
							{title && (
								<div className="xWindow-title">{title}</div>
							)}
							{this.mixIcon}
						</div>
						<div className="xWindow-content">{children}</div>
					</div>
				</Resizable>
			</DraggableCore>
		);
	}
}
