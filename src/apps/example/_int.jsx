import { useState } from "react";
import { History, Layout, Window } from "../../features";
import { useApp } from "../../features/app";
import { XIcon, XItem, XItemLabel, XItemSection, XList } from "../../shared/ui";
import { routers } from "./index";
export function App_Int() {
	const [view, setView] = useState();
	const $app = useApp();
	const $history = $app.history((history) => {
		setView(routers.find((item) => item.path === history)?.element);
	});
	if ($history.isEmpty()) {
		$history.add("/");
	}
	return (
		<Window title="Title">
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
				<>{view}</>
			</Layout>
		</Window>
	);
}
