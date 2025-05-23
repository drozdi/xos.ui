import { XBtn, XCard } from "../../shared/ui";
export function CardsExample() {
	return (
		<div className="max-w-4xl m-auto">
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
						<XCard.Section className="bg-bgmb2">
							sdfsdfsdf
						</XCard.Section>
						<XCard.Section className="bg-bgmb3">
							sdfsdfsdf
						</XCard.Section>
						<XCard.Section className="bg-bgmb5">
							sdfsdfsdf
						</XCard.Section>
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
