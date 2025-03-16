import { useState } from "react";

export function useArray(initial = []) {
	const [value, setValue] = useState(initial);

	const push = (element) => setValue((a) => [...a, element]);

	const pop = () => {
		const current = [...value];
		const deleted = current.pop();
		setValue(current);
		return deleted;
	};

	const unshift = (value) => {
		setValue([value, ...arr]);
	};

	const shift = () => {
		const current = [...value];
		const deleted = current.shift();
		setArr(current);
		return deleted;
	};

	const filter = (fn) => setValue((a) => a.filter(fn));

	const update = (index, newItem) =>
		setValue((a) => [
			...a.slice(0, index),
			newItem,
			...a.slice(index + 1, a.length),
		]);

	const remove = (index) => {
		const current = [...value];
		current.splice(index, 1);
		setValue(current);
	};

	const findIndex = (...args) => value.findIndex(...args);

	const clear = () => setValue([]);

	return [
		value,
		{
			set: setValue,
			push,
			pop,
			unshift,
			shift,
			filter,
			update,
			remove,
			clear,
			findIndex,
		},
	];
}
