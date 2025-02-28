import { useCallback, useMemo, useState } from 'react';
import { isArray } from '../../utils/is';
export function useSelectValue({
	value: currentValue,
	onChange,
	selectable,
	switchable,
	multiple,
}) {
	const [value, setValue] = useState(currentValue);

	const change = (val) => {
		onChange?.(val);
		setValue(() => val);
	};

	const select = useCallback(
		(val) => {
			if (switchable) {
				setValue(val);
				return;
			}
			if (!selectable) {
				return;
			}

			let newValue;

			if (multiple) {
				newValue = value ? (isArray(value) ? [...value] : [value]) : [];
				if (!newValue.includes(val)) {
					newValue.push(val);
				} else {
					newValue = newValue.filter((v) => v !== val);
				}
			} else {
				newValue = val === value ? undefined : val;
			}
			setValue(newValue);
		},
		[value, switchable, selectable, multiple],
	);

	return useMemo(
		() => ({
			value,
			change,
			select,
		}),
		[value],
	);
}
