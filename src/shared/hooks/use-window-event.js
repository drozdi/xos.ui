import { useEffect } from "react";
/**
 * Функция useWindowEvent создает обработчик для события окна.
 * @param {string} type - Тип события.
 * @param {Function} listener - Функция, которая будет вызвана при наступлении события.
 * @param {Object} [options] - Объект с опциями для обработчика события.
 */
export function useWindowEvent(type, listener, options) {
	useEffect(() => {
		window.addEventListener(type, listener, options);
		return () => {
			window.removeEventListener(type, listener, options);
		};
	}, [type, listener]);
}
