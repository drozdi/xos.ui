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

	const [lll, setLLL] = useState({
		type: "left",
		/*open: ls.open,
		overlay: overlay,
		breakpoint: breakpoint,
		toggle: belowBreakpoint,
		mini: ls.mini,
		miniOverlay: overlay || belowBreakpoint,
		miniMouse: true,
		miniToggle: toggle && !belowBreakpoint,
		resizeable: true,*/
		open: false,
		overlay: false,
		breakpoint: breakpoint,
		toggle: false,
		mini: false,
		miniOverlay: false,
		miniMouse: false,
		miniToggle: false,
		resizeable: false,
	});
	const uLll = ({ target }) => {
		setLLL((v) => ({ ...v, [target.name]: !v[target.name] }));
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
			<XSidebar {...lll} w={256} miniW={56}>
				left
			</XSidebar>
			<XFooter noPadding>
				<WindowManager></WindowManager>
			</XFooter>
			<XMain className="pl-128 *:block *:border-b *:border-color">
				{"open overlay toggle mini miniOverlay miniMouse miniToggle"
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
