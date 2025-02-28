import { useLayoutEffect, useState } from 'react';

function measure() {
	return {
		width: window.innerWidth,
		height: window.innerHeight,
	};
}

export function useWindowSize() {
	const [size, setSize] = useState(measure());

	useLayoutEffect(() => {
		const onResize = (event) => {
			setSize(measure());
		};
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, []);

	return size;
}
