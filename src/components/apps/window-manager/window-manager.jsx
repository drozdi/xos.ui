import { forwardRef, memo, useMemo } from "react";
import { XBtn } from "../../ui/btn";
import { useWM } from "./stack";

export const WindowManager = memo(
	forwardRef(function WindowManagerFn({}, ref) {
		const wmStack = useWM();
		const stack = useMemo(
			() => Object.values(wmStack.stack),
			[wmStack.stack]
		);
		return (
			<XBtn.Group size="lg" square separator>
				{stack.map((win) => (
					<XBtn active={wmStack.isActive(win)} key={win.uid}>
						{win.title}
					</XBtn>
				))}
			</XBtn.Group>
		);
	})
);

export default WindowManager;
