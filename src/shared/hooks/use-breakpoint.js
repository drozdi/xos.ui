import { useMemo } from "react";

/**
 * Функция useBreakpoint проверяет, превышает ли текущая ширина контекста заданный breakpoint.
 * @param {number} breakpoint - Значение breakpoint.
 * @param {number} ctxWidth - Текущая ширина контекста.
 * @returns {boolean} - Возвращает true, если текущая ширина контекста меньше заданного breakpoint, иначе false.
 */
export const useBreakpoint = (breakpoint, ctxWidth) => {
	return useMemo(
		() => breakpoint && ctxWidth < breakpoint,
		[breakpoint, ctxWidth]
	);
};
