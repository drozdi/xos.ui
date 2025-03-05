import { memo } from "react";
import { Sections } from "../../shared/internal/sections";
import { XBtn } from "../../shared/ui";
import { useApp } from "../app";
export const History = memo(function HistoryFn() {
	const $history = useApp().history();

	return (
		<Sections
			leftSection={
				<XBtn.Group color="primary">
					<XBtn
						leftSection="mdi-arrow-left"
						disabled={$history.canGoBack()}
						onClick={() => $history.back()}
					/>
					<XBtn
						rightSection="mdi-arrow-right"
						disabled={$history.canGoForward()}
						onClick={() => $history.forward()}
					/>
				</XBtn.Group>
			}
		>
			{$history.current()}
		</Sections>
	);
});
