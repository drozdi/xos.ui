import { useState } from "react";
import { Layout, Window } from "../../features";
import { AppProvider } from "../../features/app";
import { XIcon, XItem, XItemLabel, XItemSection, XList } from "../../shared/ui";
import { routers } from "./index";
export function AppExample({ smKey }) {
	const [view, setView] = useState();
	const [path, setPath] = useState();
	return (
		<AppProvider smKey={smKey}>
			<Window title="Title">
				<Layout container overlay toggle view="lhr lpr lff">
					<XList slot="left" separator>
						{routers.map((item, index) => (
							<XItem
								key={index}
								onClick={() => {
									setView(item.element);
									setPath(item.path);
								}}
								active={item.path === path}
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
					<>{view}</>
				</Layout>
			</Window>
		</AppProvider>
	);
}
