export function createEventHandler(...handlers) {
	return (...args) => {
		for (const handler of handlers) {
			handler?.(...args);
		}
	};
}
