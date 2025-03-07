import PropTypes from "prop-types";
import { memo, useMemo, useRef, useState } from "react";
import { useBreakpoint, useSlots } from "../../shared/hooks";
import { Box } from "../../shared/internal/box";
import {
	XBtn,
	XFooter,
	XHeader,
	XLayout,
	XMain,
	XSidebar,
} from "../../shared/ui";
import { useApp } from "../app";

export const Layout = memo(function LayoutFn({
	children,
	className,
	container,
	view = "hhh lpr fff",
	breakpoint = 600,
	overlay,
	toggle,
}) {
	const layoutRef = useRef();
	const [width, setWidth] = useState(0);
	const $app = useApp();
	const $sm = $app.sm("LAYOUT");
	const [ls, updateLs] = $sm.useStateObject("left", {
		width: 300,
		open: true,
		mini: true,
	});
	const [rs, updateRs] = $sm.useStateObject("right", {
		width: 300,
		open: true,
		mini: true,
	});
	const belowBreakpoint = useBreakpoint(breakpoint, width);
	const { slot, hasSlot, wrapSlot } = useSlots(children);
	const leftProps = useMemo(
		() => ({
			type: "left",
			open: ls.open,
			overlay: overlay,
			breakpoint: breakpoint,
			//toggle: belowBreakpoint,
			mini: ls.mini,
			miniOverlay: overlay || belowBreakpoint,
			miniMouse: true,
			miniToggle: toggle && !belowBreakpoint,
			//resizeable: true,
			onMini: (mini) => updateLs({ mini }),
			onResize: (width) => updateLs({ width }),
			//onToggle: () => true,
		}),
		[ls, overlay, breakpoint, toggle, belowBreakpoint]
	);
	const rightProps = useMemo(
		() => ({
			type: "right",
			open: rs.open,
			overlay: overlay,
			breakpoint: breakpoint,
			//toggle: belowBreakpoint,
			mini: rs.mini,
			miniOverlay: overlay || belowBreakpoint,
			miniMouse: true,
			miniToggle: toggle && !belowBreakpoint,
			//resizeable: true,
			onMini: (mini) => updateRs({ mini }),
			onResize: (width) => updateRs({ width }),
			//onToggle: () => true,
		}),
		[rs, overlay, breakpoint, toggle, belowBreakpoint]
	);

	const left = () => {
		return wrapSlot(slot("left", null), XSidebar, leftProps);
	};
	const right = () => {
		return wrapSlot(slot("right", null), XSidebar, rightProps);
	};
	const footer = () => {
		return wrapSlot(slot("footer", null), XFooter, { noPadding: true });
	};
	const header = () => {
		return wrapSlot(slot("header", null), XHeader, {
			align: "normal",
			leftSection: belowBreakpoint && hasSlot("left") && (
				<XBtn
					color="primary"
					leftSection="mdi-dock-left"
					size="sm"
					square
					onClick={(e) => {
						e.stopPropagation();
						e.preventDefault();
						updateLs({ open: !ls.open });
					}}
				/>
			),
			rightSection: belowBreakpoint && hasSlot("right") && (
				<XBtn
					color="primary"
					leftSection="mdi-dock-right"
					size="sm"
					square
					onClick={(e) => {
						e.stopPropagation();
						e.preventDefault();
						updateRs({ open: !rs.open });
					}}
				/>
			),
		});
	};
	const def = () => {
		return wrapSlot(slot(), XMain);
	};

	//console.log(children);
	return (
		<Box
			as={XLayout}
			noPadding
			container={container}
			className={className}
			view={view}
			onResize={({ width }) => {
				setWidth(width);
			}}
			ref={layoutRef}
		>
			{hasSlot("left") && left()}
			{hasSlot("right") && right()}
			{hasSlot("header") && header()}
			{hasSlot("footer") && footer()}
			{def()}
		</Box>
	);
});

Layout.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	view: PropTypes.string,
	container: PropTypes.bool,
	breakpoint: PropTypes.number,
	overlay: PropTypes.bool,
	toggle: PropTypes.bool,
};
