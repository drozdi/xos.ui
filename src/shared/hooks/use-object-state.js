import { useState } from "react";
/**
 * @param {*} initialState
 * @returns
 */
export const useObjectState = (initialState = {}) => {
	const [state, setState] = useState(initialState);
	const updateState = (newState) =>
		setState((prev) => ({ ...prev, ...newState }));
	return [state, updateState];
};
