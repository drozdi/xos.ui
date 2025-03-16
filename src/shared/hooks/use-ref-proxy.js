import { useState } from "react";
export function useRefProxy(initiState) {
	const [state, dispatch] = useState({ value: initiState });

	return new Proxy(state, {
		get(target, property) {
			if (property in target) {
				return target[property];
			}
			return undefined;
		},
		set(target, property, value) {
			dispatch((v) => ({ ...v, [property]: value }));
			target[property] = value;
			return true;
		},
		deleteProperty(target, property) {
			dispatch((v) => ({ ...v, [property]: undefined }));
			delete target[property];
			return true;
		},
	});
}
