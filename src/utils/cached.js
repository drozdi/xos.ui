export function cached(fn) {
	var cache = Object.create(null);
	return function cachedFn(...args) {
		var hit = cache[args.join('-')];
		return hit || (cache[args.join('-')] = fn(...args));
	};
}
