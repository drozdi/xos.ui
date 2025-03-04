import {
	cloneElement,
	Fragment,
	createElement as h,
	isValidElement,
	useMemo,
} from "react";

import { isArray, isString } from "../utils/is";

export function useSlots(children) {
	const slots = useMemo(() => {
		let tmpChildren = children;

		if (children?.type === Fragment) {
			tmpChildren = children.props.children;
		}

		tmpChildren = isArray(tmpChildren) ? tmpChildren : [tmpChildren];
		const collect = {
			default: [],
		};

		function addCollect(slotName, child) {
			if (!collect[slotName]) {
				collect[slotName] = [];
			}
			collect[slotName].concat(child);
		}

		for (const child of tmpChildren) {
			if (isValidElement(child)) {
				addCollect(child?.props?.slot || "default", child);
			} else if (isString(child)) {
				addCollect("default", child);
			} else {
				for (const name in child) {
					addCollect(name, child[name]);
				}
			}
		}

		return collect;
	}, [children]);

	/**
	 * Рендерит слот с указанным именем.
	 * Если слот пуст, использует defaultChildren.
	 */
	const slot = (name = "", defaultChildren = [], ...args) => {
		name ||= "default";

		const children =
			slots[name] ??
			(isArray(defaultChildren) ? defaultChildren : [defaultChildren]);

		function genSlot(child, ...args) {
			if (isValidElement(child)) {
				return child;
			} else if (typeof child === "function") {
				return child(...args);
			} else {
				return child;
			}
		}

		if (children.length > 1) {
			return h(
				Fragment,
				{},
				children.map((child) => {
					return genSlot(child, ...args);
				})
			);
		}
		return genSlot(children[0], ...args);
	};

	/**
	 * Проверяет, существует ли слот и содержит ли он элементы.
	 */
	const hasSlot = (slotName) => {
		return slots.hasOwnProperty(slotName) && slots[slotName].length > 0;
	};

	/**
	 * Оборачивает элемент в указанный компонент, если он еще не обернут.
	 */
	const wrapSlot = (slot, component, props = {}) => {
		if (slot.type === component) {
			return cloneElement(slot, props);
		}
		return h(component, props, slot);
	};

	return { slot, hasSlot, wrapSlot, slots };
}
