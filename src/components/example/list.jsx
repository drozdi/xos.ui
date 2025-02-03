import { XIcon, XItem, XItemLabel, XItemSection, XList } from '../ui';
export function ListExample() {
	return (
		<div className="max-w-4xl m-auto py-4 relative">
			<h2 className="text-center text-2xl mb-4 bg-bgmb1">XList</h2>
			<div className="w-64 absolute left-1/2 -translate-x-1/2 top-12 pt-8">
				<XList bordered separator>
					<XItem as="label">
						<XItemSection side>
							<input type="checkbox" value={1} disabled />
						</XItemSection>
						<XItemSection>
							<XItemLabel>Item 1</XItemLabel>
						</XItemSection>
					</XItem>
					<XItem as="label">
						<XItemSection side>
							<input type="checkbox" value={2} />
						</XItemSection>
						<XItemSection>
							<XItemLabel>Item 2</XItemLabel>
						</XItemSection>
					</XItem>
					<XItem as="label">
						<XItemSection side>
							<input type="checkbox" value={3} />
						</XItemSection>
						<XItemSection>
							<XItemLabel>Item 3</XItemLabel>
						</XItemSection>
					</XItem>
					<XItem>
						<XItemSection side>
							<XIcon>mdi-home</XIcon>
						</XItemSection>
						<XItemSection>
							<XItemLabel>Item 3</XItemLabel>
						</XItemSection>
						<XItemSection side>
							<XIcon>mdi-home</XIcon>
						</XItemSection>
						<XItemSection side>
							<XIcon>mdi-close</XIcon>
						</XItemSection>
					</XItem>
					<XItem to="https://ya.ru/" target="_blank">
						<XItemSection side>
							<XIcon>mdi-home</XIcon>
						</XItemSection>
						<XItemSection>
							<XItemLabel overline>Item 1</XItemLabel>
							<XItemLabel>label</XItemLabel>
							<XItemLabel caption>Description</XItemLabel>
						</XItemSection>
						<XItemSection side top>
							<XIcon>mdi-close</XIcon>
						</XItemSection>
					</XItem>
					<XItem to="https://ya.ru/" target="_blank" disabled>
						<XItemSection side>
							<XIcon>mdi-home</XIcon>
						</XItemSection>
						<XItemSection>Yandex</XItemSection>
					</XItem>
					<XItem disabled>
						<XItemSection>Item 3</XItemSection>
						<XItemSection side>
							<XIcon>mdi-arrow-down</XIcon>
						</XItemSection>
					</XItem>
					<XItem active>
						<XItemSection>Item 4</XItemSection>
					</XItem>
				</XList>
			</div>
		</div>
	);
}
