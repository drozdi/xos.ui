import { Sections } from "../../shared/internal/sections";
import { XBtn } from "../../shared/ui";
import { isFunction } from "../../shared/utils/is";
import { useApp } from "../app";
export const History = function HistoryFn({ children, show }) {
	const $history = useApp().history();
	return (
		<Sections
			className="!p-0 items-normal"
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
			{show &&
				((isFunction(children)
					? children($history.current())
					: children) ??
					$history.current())}
		</Sections>
	);
};
