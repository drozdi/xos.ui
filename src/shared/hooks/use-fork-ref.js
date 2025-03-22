import { useMemo } from "react";
import { isFunction, isObject } from "../utils/is";

/**
 * Функция setRef устанавливает значение для ссылки.
 * @param {Function|Object} ref - Ссылка, для которой нужно установить значение.
 * @param {*} [value=null] - Значение, которое нужно установить для ссылки.
 */
export function setRef(ref, value = null) {
	if (isFunction(ref)) {
		ref(value);
	} else if (isObject(ref) && "current" in ref) {
		ref.current = value;
	}
}

/**
 * Функция useForkRef создает функцию для установки значения для нескольких ссылок.
 * @param {...(Function|Object)} refs - Ссылки, для которых нужно установить значение.
 * @returns {Function|null} - Функция для установки значения для ссылок или null, если все ссылки равны null.
 */
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
