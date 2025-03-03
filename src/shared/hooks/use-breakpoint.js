import { useMemo } from "react";

/**
 * @param {*} breakpoint
 * @param {*} ctxWidth
 * @returns {boolean} true if the breakpoint is met
 */
export const useBreakpoint = (breakpoint, ctxWidth) => {
	return useMemo(
		() => breakpoint && ctxWidth < breakpoint,
		[breakpoint, ctxWidth]
	);
};
