import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "../utils/debounce"; // Или любая другая библиотека для дебаунсинга

function measure() {
	return {
		top: 0,
		left: 0,
		width: window.innerWidth,
		height: window.innerHeight,
		right: window.innerWidth,
		bottom: window.innerHeight,
	};
}
/**
 * Функция useWindowResizeObserver создает обработчик для отслеживания изменения размера окна.
 * @param {Object} [options] - Объект с опциями.
 * @param {Function} [options.onResize] - Функция, которая будет вызвана при изменении размера элемента.
 * @param {number} [options.debounceTime=200] - Время задержки перед вызовом функции onResize.
 * @returns {Object} - Объект текущие размеры окна.
 */
export function useWindowResizeObserver({ onResize, debounceTime = 200 } = {}) {
	const [size, setSize] = useState(measure());
	const lastSizeRef = useRef(size);
	const resizeListenerRef = useRef();

	const handleResize = useCallback(() => {
		const newSize = measure();

		if (JSON.stringify(newSize) !== JSON.stringify(lastSizeRef.current)) {
			lastSizeRef.current = newSize;
			setSize(newSize);
			onResize?.(newSize);
		}
	}, [onResize]);

	const debouncedResize = useCallback(
		debounce(handleResize, debounceTime ?? 200),
		[debounceTime]
	);

	useEffect(() => {
		if (typeof window === "undefined") return;

		resizeListenerRef.current = debouncedResize;
		window.addEventListener("resize", debouncedResize);

		// Инициализация начальных значений
		handleResize();

		return () => {
			window.removeEventListener("resize", debouncedResize);
			debouncedResize.cancel?.();
		};
	}, [debouncedResize, handleResize]);

	return { ...size, getSnapshot: () => lastSizeRef.current };
}
