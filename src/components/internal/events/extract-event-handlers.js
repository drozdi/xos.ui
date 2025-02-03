import { isFunction } from '../../../utils/is';
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
				!excludeKeys.includes(prop),
		)
		.forEach((prop) => {
			result[prop] = object[prop];
		});

	return result;
}
