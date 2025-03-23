import { useEffect, useState } from "react";
import { History, Layout, Window } from "../../features";
import { useApp } from "../../features/app";
import { Box } from "../../shared/internal/box";
import {
	XIcon,
	XItem,
	XItemLabel,
	XItemSection,
	XList,
	XMain,
} from "../../shared/ui";
import { routers } from "./index";

export function AppExample({ ...props }) {
	console.log(props);
	const [view, setView] = useState("");
	const $app = useApp();
	const $history = $app.history((history) => {
		setView(routers.find((item) => item.path === history)?.element);
	});
	console.log($app);
	useEffect(() => {
		if ($history.isEmpty()) {
			$history.add("/");
		}
	}, []);
	return (
		<Window
			title="Title"
			draggable
			resizable
			icons="collapse fullscreen close"
		>
			<Layout container overlay toggle view="lhr lpr lff">
				<XList slot="left" separator>
					{routers.map((item, index) => (
						<XItem
							key={index}
							onClick={() => {
								$history.add(item.path);
							}}
							active={$history.isCurrent(item.path)}
						>
							<XItemSection side>
								<XIcon>{item.icon}</XIcon>
							</XItemSection>
							<XItemSection>
								<XItemLabel lines>{item.label}</XItemLabel>
							</XItemSection>
						</XItem>
					))}
				</XList>
				<History
					slot="header"
					show
					bodyClass="text-center text-2xl bg-bgmb1"
				>
					{(history) => (
						<Box.Header level={2}>
							{
								routers.find((item) => item.path === history)
									?.label
							}
						</Box.Header>
					)}
				</History>
				<XMain className="p-3 relative">{view}</XMain>
			</Layout>
		</Window>
	);
}

AppExample.displayName = "apps/example/app";

export default AppExample;
