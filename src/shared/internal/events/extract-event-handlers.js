import { isFunction } from "../../utils/is";
/**
 * Функция extractEventHandlers извлекает обработчики событий из объекта.
 * @param {Object} [object={}] - Объект, из которого нужно извлечь обработчики событий.
 * @param {Array} [excludeKeys=[]] - Массив ключей, которые нужно исключить из извлечения.
 * @returns {Object} - Объект с извлеченными обработчиками событий.
 */
export function extractEventHandlers(object = {}, excludeKeys = []) {
	if (object === undefined) {
		return {};
	}

	const result = {};

	Object.keys(object)
		.filter(
			(prop) =>
				prop.match(/^on[A-Z]/) &&
				isFunction(object[prop]) &&
				!excludeKeys.includes(prop)
		)
		.forEach((prop) => {
			result[prop] = object[prop];
		});

	return result;
}
