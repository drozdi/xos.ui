/**
 * Функция createEventHandler создает обработчик событий, который вызывает все переданные обработчики.
 * @param {...Function} handlers - Обработчики событий.
 * @returns {Function} - Обработчик событий.
 */
export function createEventHandler(...handlers) {
	return (...args) => {
		for (const handler of handlers) {
			handler?.(...args);
		}
	};
}
