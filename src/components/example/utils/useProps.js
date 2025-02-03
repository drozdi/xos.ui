import { isValidElement, useMemo, useState } from 'react';
import { isBoolean } from '../../../utils/is';

export function useProps(initial = {}, tag = '', body = '') {
	const [props, setProps] = useState(initial);
	const onSelect = (prop, value) => {
		setProps((v) => ({ ...v, [prop]: value }));
	};
	const onText = (prop, value) => {
		setProps((v) => ({ ...v, [prop]: value }));
	};
	const onCheckbox = (prop) => {
		setProps((v) => ({ ...v, [prop]: !v[prop] }));
	};
	const code = useMemo(() => {
		let str = `<${tag}`;
		for (let prop in props) {
			if (props[prop]) {
				if (isBoolean(props[prop])) {
					str += `\n ${prop}`;
				} else if (isValidElement(props[prop])) {
					//str += `\n ${props[prop].toString()}`;
				} else {
					str += `\n ${prop}="${props[prop]}"`;
				}
			}
		}
		if (body) {
			str += `>${body}</${tag}>`;
		} else {
			str += ' />';
		}

		return str;
	}, [props, tag, body]);
	return { props, onSelect, onText, onCheckbox, code };
}
