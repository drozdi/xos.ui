import { useState } from "react";
import { isFunction } from "../utils/is";
/**
 * @param {*} initialState
 * @returns
 */
/**
 * Функция useStateObject создает состояние и функцию для обновления состояния.
 * @param {Object} [initialState={}] - Начальное значение состояния.
 * @returns {Array} - Массив, содержащий текущее значение состояния и функцию для обновления состояния.
 */
export const useStateObject = (initialState = {}) => {
	const [state, setState] = useState(initialState);
	const updateState = (newState) =>
		setState((prev) => ({
			...prev,
			...(isFunction(newState) ? newState(prev) : newState),
		}));
	return [state, updateState];
};
