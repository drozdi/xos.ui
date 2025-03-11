import { useState } from "react";
import { isFunction } from "../utils/is";
/**
 * @param {*} initialState
 * @returns
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
