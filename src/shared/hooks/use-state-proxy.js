import { useState } from "react";

/**
 * Хук для создания прокси-объекта, который автоматически обновляет состояние.
 * @param {Object} initialState Начальное состояние.
 * @returns {Proxy} Прокси-объект, который обновляет состояние при изменении свойств.
 */
export function useStateProxy(initiState = {}) {
	const [state, dispatch] = useState(initiState);
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
