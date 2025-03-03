import { memo, useMemo, useRef, useState } from "react";
import { useBreakpoint } from "../../shared/hooks";
import { ThemeProviderToggler } from "../../shared/hooks/useTheme";
import {
	XBtn,
	XFooter,
	XHeader,
	XLayout,
	XMain,
	XSidebar,
} from "../../shared/ui";
import { useApp } from "../app";
import { WindowManager } from "../window-manager";

export const Layout = memo(function LayoutFn({
	children,
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
		[rs, overlay, breakpoint, toggle, belowBreakpoint]
	);
	console.log(layoutRef);
	return (
		<XLayout
			container={container}
			view={view}
			onResize={({ width }) => {
				setWidth(width);
			}}
			ref={layoutRef}
		>
			<XHeader
				leftSection={
					belowBreakpoint && (
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
					belowBreakpoint && (
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
				<ThemeProviderToggler></ThemeProviderToggler>
			</XHeader>
			<XSidebar {...leftProps}></XSidebar>
			<XSidebar {...rightProps}></XSidebar>
			<XFooter noPadding>
				<WindowManager></WindowManager>
			</XFooter>
			<XMain className="pl-64 *:block *:border-b *:border-color">
				{false &&
					"open overlay toggle mini miniOverlay miniMouse miniToggle"
						.split(/\s+/)
						.map((prop) => (
							<label key={prop}>
								<input
									name={prop}
									checked={lll[prop]}
									type="checkbox"
									onChange={uLll}
								/>
								<span className="ml-3 font-medium">{prop}</span>
							</label>
						))}
			</XMain>
		</XLayout>
	);
});
