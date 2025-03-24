/**
 * Функция debounce создает функцию, которая будет вызвана не чаще, чем через заданный интервал времени.
 * @param {Function} fn - Функция, которую нужно задержать.
 * @param {number} delay - Интервал времени в миллисекундах.
 * @returns {Function} - Задержанная функция.
 */
export function debounce(fn, delay) {
	let timer;
	return function (...args) {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => fn(...args), delay);
	};
}
