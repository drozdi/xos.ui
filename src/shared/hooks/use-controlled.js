import { useState } from "react";

export function useUncontrolled({ initial, onChange = () => {} }) {
	const [value, setValue] = useState(initial);
	const handler = (...args) => {
		setValue(...args);
		onChange?.(...args);
	};
	return [value, handler];
}
