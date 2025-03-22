import { useState } from "react";

/**
 * Функция useUncontrolled создает состояние и обработчик для неуправляемого компонента.
 * @param {Object} options - Объект с опциями.
 * @param {*} options.initial - Начальное значение состояния.
 * @param {Function} [options.onChange] - Функция, которая будет вызвана при изменении состояния.
 * @returns {Array} - Массив, содержащий текущее значение состояния и обработчик для изменения состояния.
 */
export function useUncontrolled({ initial, onChange = () => {} }) {
	const [value, setValue] = useState(initial);
	const handler = (...args) => {
		setValue(...args);
		onChange?.(...args);
	};
	return [value, handler];
}
