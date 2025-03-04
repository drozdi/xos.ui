import PropTypes from "prop-types";
import { memo, useMemo, useRef, useState } from "react";
import { useBreakpoint } from "../../shared/hooks";
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
	header,
	footer,
	left,
	right,
}) {
	const layoutRef = useRef();
	const [width, setWidth] = useState(0);
	const $app = useApp();
	const $sm = $app.sm("LAYOUT");
	const [ls, updateLs] = $sm.useObjectState("left", {
		width: 300,
		open: true,
		mini: true,
	});
	const [rs, updateRs] = $sm.useObjectState("right", {
		width: 300,
		open: true,
		mini: true,
	});
	const belowBreakpoint = useBreakpoint(breakpoint, width);
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
	console.log(children);
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
			<XHeader
				if={() => !!header}
				leftSection={
					belowBreakpoint &&
					!!left && (
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
					)
				}
				rightSection={
					belowBreakpoint &&
					!!right && (
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
					)
				}
			>
				{header}
			</XHeader>
			<XSidebar {...leftProps} if={() => !!left}>
				{left}
			</XSidebar>
			<XSidebar {...rightProps} if={() => !!right}>
				{right}
			</XSidebar>
			<XFooter if={() => !!footer} noPadding>
				{footer}
			</XFooter>
			<XMain>{children}</XMain>
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
