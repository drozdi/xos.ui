import { useEffect, useState } from "react";
import appsManager from "../../entites/core/apps-manager";
import { History, Layout, Window } from "../../features";
import { useApp } from "../../features/app";
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

	useEffect(() => {
		if ($history.isEmpty()) {
			$history.add("/");
		}
	}, []);
	return (
		<Window title="Title" icons="collapse fullscreen close">
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
				<History slot="header" show>
					{(history) =>
						routers.find((item) => item.path === history)?.label
					}
				</History>
				<XMain>{view}</XMain>
			</Layout>
		</Window>
	);
}

AppExample.displayName = "./example/AppExample";

appsManager.append(
	{ displayName: "./example/AppExample" },
	{
		pathName: "example-app",
		wmGroup: "example-app",
		wmSort: 1,
	}
);
