import { useMemo } from "react";
import { isFunction, isObject } from "../utils/is";

export function setRef(ref, value = null) {
	if (isFunction(ref)) {
		ref(value);
	} else if (isObject(ref) && "current" in ref) {
		ref.current = value;
	}
}
export function useForkRef(...refs) {
	return useMemo(() => {
		if (refs.every((ref) => ref == null)) {
			return null;
		}
		return (instance) => {
			refs.forEach((ref) => {
				setRef(ref, instance);
			});
		};
	}, refs);
}
