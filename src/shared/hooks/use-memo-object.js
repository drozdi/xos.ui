import { useMemo } from "react";

export function useMemoObject(object) {
	const deps = Object.values(object);
	return useMemo(() => object, deps);
}
