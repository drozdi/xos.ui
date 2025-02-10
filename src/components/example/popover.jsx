import { XBtn, XPopover, XPopoverTarget } from "../ui";
export function PopoverExample() {
	return (
		<div className="max-w-4xl m-auto p-4 relative">
			<h2 className="text-center text-2xl mb-4 bg-bgmb1">XPopover</h2>
			<div className="">
				<XPopover>
					<XPopoverTarget>
						<XBtn>Target</XBtn>
					</XPopoverTarget>
				</XPopover>
			</div>
		</div>
	);
}
