import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "../utils/debounce"; // Или любая другая библиотека для дебаунсинга

/**
 * Функция useResizeObserver создает обработчик для отслеживания изменения размера элемента.
 * @param {Object} [options] - Объект с опциями.
 * @param {Function} [options.onResize] - Функция, которая будет вызвана при изменении размера элемента.
 * @param {number} [options.debounceTime=100] - Время задержки перед вызовом функции onResize.
 * @returns {Object} - Объект, содержащий ссылку на элемент и текущие размеры элемента.
 */
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
