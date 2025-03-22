import { useMemo } from "react";

/**
 * Функция useMemoObject создает мемоизированный объект.
 * @param {Object} object - Объект, который нужно мемоизировать.
 * @returns {Object} - Мемоизированный объект.
 */
export function useMemoObject(object) {
	const deps = Object.values(object);
	return useMemo(() => object, deps);
}
