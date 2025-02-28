import { useLayoutEffect, useRef } from 'react';

export function useResizeObserver(callback = (target, entry) => {}) {
	const ref = useRef(null);
	useLayoutEffect(() => {
		const element = ref?.current;
		if (!element) {
			return;
		}

		const observer = new ResizeObserver((entries) => {
			callback(element, entries[0]);
		});

		observer.observe(element);
		return () => {
			observer.disconnect();
		};
	}, [callback, ref]);

	return ref;
}
