import { useEffect, useState } from "react";
import { useWindowEvent } from "./use-window-event";

/**
 * Функция getScrollPosition возвращает текущую позицию прокрутки окна.
 * @returns {Object} - Объект, содержащий текущую позицию прокрутки окна.
 */
function getScrollPosition() {
	return typeof window !== "undefined"
		? { x: window.pageXOffset, y: window.pageYOffset }
		: { x: 0, y: 0 };
}

/**
 * Функция scrollTo прокручивает окно до заданных координат.
 * @param {Object} options - Объект с опциями.
 * @param {number} [options.x] - Координата по оси X.
 * @param {number} [options.y] - Координата по оси Y.
 */
function scrollTo({ x, y }) {
	if (typeof window !== "undefined") {
		const scrollOptions = { behavior: "smooth" };

		if (typeof x === "number") {
			scrollOptions.left = x;
		}

		if (typeof y === "number") {
			scrollOptions.top = y;
		}

		window.scrollTo(scrollOptions);
	}
}

/**
 * Функция useWindowScroll создает состояние и функцию для прокрутки окна.
 * @returns {Array} - Массив, содержащий текущую позицию прокрутки окна и функцию для прокрутки окна.
 */
export function useWindowScroll() {
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useWindowEvent("scroll", () => setPosition(getScrollPosition()));
	useWindowEvent("resize", () => setPosition(getScrollPosition()));

	useEffect(() => {
		setPosition(getScrollPosition());
	}, []);

	return [position, scrollTo];
}
