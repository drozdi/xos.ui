import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "../utils/debounce"; // Или любая другая библиотека для дебаунсинга

export function useResizeObserver({ onResize, debounceTime = 100 } = {}) {
	const [{ width, height }, setSize] = useState({ width: 0, height: 0 });
	const ref = useRef(null);

	const debouncedResize = useCallback(
		debounce((entries) => {
			const { inlineSize: width, blockSize: height } =
				entries[0].borderBoxSize[0];

			setSize((prevSize) => {
				if (prevSize.width !== width || prevSize.height !== height) {
					return { width, height };
				}
				return prevSize;
			});

			onResize?.({ width, height });
		}, debounceTime),
		[onResize, debounceTime]
	);

	useEffect(() => {
		if (!ref.current) {
			return;
		}

		const observer = new ResizeObserver(debouncedResize);

		observer.observe(ref.current);

		return () => {
			if (ref.current) {
				observer.disconnect();
			}
		};
	}, [ref.current, debouncedResize]);

	return { ref, width, height };
}
