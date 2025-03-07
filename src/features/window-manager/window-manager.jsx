import { forwardRef, memo, useMemo } from "react";
import { XBtn } from "../../shared/ui/btn";
import { wmStore } from "./store";

export const WindowManager = memo(
	forwardRef(function WindowManagerFn({}, ref) {
		const store = wmStore();
		console.log(store.zIndex);
		const stack = useMemo(() => Object.values(store.stack), [store]);
		return (
			<XBtn.Group size="lg" square separator>
				{stack.map((win) => (
					<XBtn
						active={store.isActive(win)}
						key={win.uid}
						onClick={(e) => win.focus(e)}
					>
						{win.title}
					</XBtn>
				))}
			</XBtn.Group>
		);
	})
);

export default WindowManager;
