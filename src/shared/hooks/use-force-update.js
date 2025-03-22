import { useState } from "react";
import { debounce } from "../utils/debounce";

/**
 * Функция useForceUpdate создает функцию для принудительного обновления компонента.
 * @param {Object} [options] - Объект с опциями.
 * @param {number} [options.debounceTime=100] - Время задержки перед обновлением компонента.
 * @returns {Function} - Функция для принудительного обновления компонента.
 */
export function useForceUpdate({ debounceTime = 100 } = {}) {
	const [, setToggle] = useState(false);
	return () => debounce(() => setToggle((toggle) => !toggle), debounceTime);
}
