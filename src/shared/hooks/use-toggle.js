import { useCallback, useState } from "react";

/**
 * Функция useToggle создает состояние и функцию для переключения состояния.
 * @param {boolean} [initial=false] - Начальное значение состояния.
 * @returns {Array} - Массив, содержащий текущее значение состояния и функцию для переключения состояния.
 */
export function useToggle(initial = false) {
	const [value, setValue] = useState(initial);
	const toggle = useCallback(() => setValue((v) => !v), []);
	return [value, toggle];
}
