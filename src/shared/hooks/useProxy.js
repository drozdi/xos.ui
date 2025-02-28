import { useState } from 'react';

export function useProxy(initiState = {}) {
	const [state, setState] = useState(initiState);
	return new Proxy(state, {
		get(target, property) {
			if (property in target) {
				return target[property];
			} else {
				return undefined;
			}
		},
		set(target, property, value) {
			setState((v) => ({ ...v, [property]: value }));
			target[property] = value;
			return true;
		},
		deleteProperty(target, property) {
			// перехватываем удаление свойства
			setState((v) => {
				let newV = { ...v };
				delete newV[property];
				return newV;
			});
			delete target[property];
			return true;
		},
	});
}
