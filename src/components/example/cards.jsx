import { XBtn, XCard } from '../ui';
export function CardsExample() {
	return (
		<div className="max-w-4xl m-auto py-4 relative">
			<h2 className="text-center text-2xl mb-4 bg-bgmb1">XCard</h2>
			<div className="max-w-lg m-auto">
				<XCard border>
					<XCard.Section horizontal>
						<XCard.Section className="bg-bgmb5">
							parent: horizontal
						</XCard.Section>
						<XCard.Section className="bg-bgmb2">
							parent: horizontal
						</XCard.Section>
						<XCard.Section className="bg-bgmb3">
							parent: horizontal
						</XCard.Section>
					</XCard.Section>
					<XCard.Section>
						<XCard.Section className="bg-bgmb2">sdfsdfsdf</XCard.Section>
						<XCard.Section className="bg-bgmb3">sdfsdfsdf</XCard.Section>
						<XCard.Section className="bg-bgmb5">sdfsdfsdf</XCard.Section>
					</XCard.Section>
					<XCard.Actions horizontal className="bg-bgmb1" align="end">
						<XBtn color="positive">positive</XBtn>
						<XBtn color="accent">accent</XBtn>
						<XBtn color="warning">warning</XBtn>
					</XCard.Actions>
				</XCard>
			</div>
		</div>
	);
}
