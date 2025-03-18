import { useState } from "react";

export function useUncontrolled({
	value,
	defaultValue,
	finalValue,
	onChange = () => {},
}) {
	const [unValue, setValue] = useState(
		defaultValue !== undefined ? defaultValue : finalValue
	);
	const handler = (...args) => {
		setValue(...args);
		onChange?.(...args);
	};
	if (value !== undefined) {
		return [value, onChange, true];
	}
	return [unValue, handler, false];
}
