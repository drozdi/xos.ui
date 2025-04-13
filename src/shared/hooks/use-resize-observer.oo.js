import { useElementResizeObserver } from "./use-element-resize-observer";
import { useWindowResizeObserver } from "./use-window-resize-observer";

/**
 * Функция useResizeObserver создает обработчик для отслеживания изменения размера элемента.
 * @param {Object} [options] - Объект с опциями.
 * @param {HTMLElement|null} [options.element=null] - Элемент, размеры которого нужно отслеживать.
 * @param {Function} [options.onResize] - Функция, которая будет вызвана при изменении размера элемента.
 * @param {number} [options.debounceTime=100] - Время задержки перед вызовом функции onResize.
 * @param {string} [options.boxModel="content-box"] - Модель размера контейнера ("content-box" или "border-box").
 * @returns {Object} - Объект, содержащий ссылку на элемент и текущие размеры элемента.
 */
export function useResizeObserver({
	element = null,
	onResize,
	debounceTime = 200,
	boxModel = "content-box",
} = {}) {
	console.log(element);

	// Если элемент есть → следим за ним, иначе → следим за окном
	const elementObserver = useElementResizeObserver({
		element,
		onResize,
		debounceTime,
		boxModel,
	});

	const windowObserver = useWindowResizeObserver({
		onResize,
		debounceTime,
	});

	return element ? elementObserver : windowObserver;
}
