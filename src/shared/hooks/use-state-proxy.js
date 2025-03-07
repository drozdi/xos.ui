import { useState } from "react";

export function useStateProxy(initiState = {}) {
	const [state, dispatch] = useState(initiState);
	return new Proxy(state, {
		get(target, property) {
			if (property in target) {
				return target[property];
			} else {
				return undefined;
			}
		},
		set(target, property, value) {
			dispatch((v) => ({ ...v, [property]: value }));
			target[property] = value;
			return true;
		},
		deleteProperty(target, property) {
			/*dispatch((v) => {
				let newV = { ...v };
				delete newV[property];
				return newV;
			});*/
			dispatch((v) => ({ ...v, [property]: undefined }));
			delete target[property];
			return true;
		},
	});
}
