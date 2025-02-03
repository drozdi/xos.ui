import { AccordionExample } from './accordion';
import { BtnExample } from './btn';
import { BtnGroupExample } from './btnGroup';
import { CardsExample } from './cards';
import { InputExample } from './input';
import { LinkExample } from './link';
import { ListExample } from './list';
import { MessageExample } from './message';
import { ProgressExample } from './progress';
import { SelectExample } from './select';
import { SpinnerExample } from './spinner';
import { TabsExample } from './tabs';

export * from './accordion';
export * from './btn';
export * from './btnGroup';
export * from './cards';
export * from './home';
export * from './input';
export * from './link';
export * from './list';
export * from './message';
export * from './progress';
export * from './select';
export * from './spinner';
export * from './tabs';

export default function ({
	btn,
	input,
	btnGroup,
	list,
	tabs,
	link,
	message,
	spinner,
	progress,
	cards,
	accordion,
	select,
}) {
	return (
		<div className="py-8">
			{btnGroup && <BtnGroupExample />}
			{btn && <BtnExample />}
			{input && <InputExample />}
			{select && <SelectExample />}
			{link && <LinkExample />}
			{list && <ListExample />}
			{message && <MessageExample />}
			{spinner && <SpinnerExample />}
			{progress && <ProgressExample />}
			{cards && <CardsExample />}
			{accordion && <AccordionExample />}
			{tabs && <TabsExample />}
		</div>
	);
}
