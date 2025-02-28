import {
	XBtn,
	XPopover,
	XPopoverDropDown,
	XPopoverTarget,
} from "../../shared/ui";
export function PopoverExample() {
	return (
		<div className="max-w-4xl m-auto p-4 relative">
			<h2 className="text-center text-2xl mb-4 bg-bgmb1">XPopover</h2>
			<div className="pt-112">
				<XPopover arrow offset={0} position="bottom-end">
					<XPopoverTarget>
						<XBtn>Target</XBtn>
					</XPopoverTarget>
					<XPopoverDropDown>
						<div className="bg-bgmb3 p-6">
							<div className="bg-bgmb5 py-6 px-12">dropdown</div>
						</div>
					</XPopoverDropDown>
				</XPopover>
			</div>
		</div>
	);
}
