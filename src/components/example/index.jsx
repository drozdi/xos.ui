import { BtnExample } from "./btn";
import { BtnGroupExample } from "./btnGroup";
import { LinkExample } from "./link";
import { ListExample } from "./list";
import { ProgressExample } from "./progress";
import { SpinnerExample } from "./spinner";

export * from "./btn";
export * from "./btnGroup";
export * from "./home";
export * from "./link";
export * from "./list";
export * from "./progress";
export * from "./spinner";

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
			{select && <SelectExample />}
			{link && <LinkExample />}
			{list && <ListExample />}
			{spinner && <SpinnerExample />}
			{progress && <ProgressExample />}
		</div>
	);
}
