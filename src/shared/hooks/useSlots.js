import {
	cloneElement,
	Fragment,
	createElement as h,
	isValidElement,
	useMemo,
} from 'react';

import { isString } from '../../utils/is';

export function useSlots(children) {
	const slots = useMemo(() => {
		let tmpChildren = children;

		if (children?.type === Fragment) {
			tmpChildren = children.props.children;
		}

		tmpChildren = Array.isArray(tmpChildren) ? tmpChildren : [tmpChildren];
		const collect = {
			default: [],
		};

		function addCollect(slotName, child) {
			if (!collect[slotName]) {
				collect[slotName] = [];
			}
			collect[slotName].push(child);
		}

		for (const child of tmpChildren) {
			if (isValidElement(child)) {
				addCollect(child?.props?.slot || 'default', child);
			} else if (isString(child)) {
				addCollect('default', child);
			} else {
				for (const name in child) {
					addCollect(name, child[name]);
				}
			}
		}

		return collect;
	}, [children]);

	const slot = (name = '', defaultChildren = [], ...args) => {
		name ||= 'default';

		const children =
			slots[name] ??
			(Array.isArray(defaultChildren) ? defaultChildren : [defaultChildren]);

		function genSlot(child, ...args) {
			if (isValidElement(child)) {
				return child;
			} else if (typeof child === 'function') {
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
				}),
			);
		}
		return genSlot(children[0], ...args);
	};

	const hasSlot = (slot) => {
		return slots.hasOwnProperty(slot) && slots[slot].length > 0;
	};

	const wrapSlot = (slot, componentName, props = {}) => {
		if (slot.type === componentName) {
			return cloneElement(slot, props);
		}
		return h(componentName, props, slot);
	};

	return { slot, hasSlot, wrapSlot, slots };
}
