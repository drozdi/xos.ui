import { XBtn, XPopover, XPopoverDropDown, XPopoverTarget } from "../ui";
export function PopoverExample() {
	return (
		<div className="max-w-4xl m-auto p-4 relative">
			<h2 className="text-center text-2xl mb-4 bg-bgmb1">XPopover</h2>
			<div className="pt-48 ps-48">
				<XPopover>
					<XPopoverTarget>
						<XBtn>Target</XBtn>
					</XPopoverTarget>
					<XPopoverDropDown>
						<div className="bg-bgmb3 p-6">
							<div className="bg-bgmb5 p-6">dropdown</div>
						</div>
					</XPopoverDropDown>
				</XPopover>
			</div>
		</div>
	);
}
