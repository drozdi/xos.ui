export const storageLocal = {
	set(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	},
	del(key) {
		localStorage.removeItem(key);
	},
	get(key, def) {
		let result = localStorage.getItem(key);
		try {
			if (result) {
				return JSON.parse(result);
			}
		} catch (e) {
			return def;
		}
		return def;
	},
	has(key) {
		return !!localStorage.getItem(key);
	},
	default(key, value) {
		if (!this.has(key)) {
			localStorage.setItem(key, JSON.stringify(value));
		}
	},
};
