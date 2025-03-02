import { memo, useMemo, useState } from "react";
import { ThemeProviderToggler } from "../../shared/hooks/useTheme";
import { XFooter, XHeader, XLayout, XMain, XSidebar } from "../../shared/ui";
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
	const [width, setWidh] = useState(0);
	const $s = useApp().$sm("LAYOUT");
	const [ls, setLs] = $s.useState("left", {
		width: 300,
		open: true,
		mini: true,
	});

	const belowBreakpoint = useMemo(
		() => (breakpoint && width < breakpoint) || false,
		[width, breakpoint]
	);

	const lll = {
		type: "left",
		open: ls.open,
		overlay: overlay,
		breakpoint: breakpoint,
		toggle: belowBreakpoint,
		mini: ls.mini,
		miniOverlay: overlay || belowBreakpoint,
		miniMouse: overlay && toggle,
		miniToggle: toggle && !belowBreakpoint,
		//resizeable: true,
		onMini: (mini) => setLs({ ...ls, mini }),
		onResize: (width) => setLs({ ...ls, width }),
		//onToggle: (open) => setLs({ ...ls, open }),
	};
	return (
		<XLayout
			container={container}
			view={view}
			onResize={({ width }) => {
				setWidh(width);
			}}
		>
			<XHeader>
				<ThemeProviderToggler></ThemeProviderToggler>
			</XHeader>
			<XSidebar {...lll}>left</XSidebar>
			<XFooter noPadding>
				<WindowManager></WindowManager>
			</XFooter>
			<XMain></XMain>
		</XLayout>
	);
});
