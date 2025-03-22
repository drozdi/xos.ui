import { useState } from "react";
/**
 * Функция useUncontrolled используется для управления неуправляемыми значениями.
 * @param {Object} options - Объект с параметрами.
 * @param {*} [options.value] - Значение, которое будет использоваться, если оно определено.
 * @param {*} [options.defaultValue] - Значение по умолчанию, которое будет использоваться, если value не определено.
 * @param {*} [options.finalValue] - Значение, которое будет использоваться, если ни value, ни defaultValue не определены.
 * @param {Function} [options.onChange=() => {}] - Функция, которая будет вызываться при изменении значения.
 * @returns {Array} - Массив, содержащий значение, функцию обработчика и флаг, указывающий, используется ли управляемое значение.
 */
export function useUncontrolled({
	value,
	defaultValue,
	finalValue,
	onChange = () => {},
}) {
	const [unValue, setValue] = useState(
		defaultValue !== undefined ? defaultValue : finalValue
	);
	const handler = (...args) => {
		setValue(...args);
		onChange?.(...args);
	};
	if (value !== undefined) {
		return [value, onChange, true];
	}
	return [unValue, handler, false];
}
