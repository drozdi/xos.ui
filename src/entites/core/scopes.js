class mScope {
	constructor(app = "", parent) {
		this.app = app;
		this.parent = parent;
	}
	checkHasScope(scope) {
		scope = scope.split(".");
		let can = scope.shift();
		if (scope.length === 0) {
			scope.unshift(this.app);
		}
		scope.unshift(can);
		return this.parent.checkHasScope(scope.join("."));
	}
	getRoleRoot(scope) {
		scope = scope.split(".").slice(scope.substr(0, 4) == "can_" ? 1 : 0);
		scope.unshift(this.app);
		return scope.map((e, i) => {
			return scope
				.slice(0, i + 1)
				.push("root")
				.join("_")
				.toUpperCase();
		});
	}
	getRoleAdmin(scope) {
		scope = scope.split(".").slice(scope.substr(0, 4) == "can_" ? 1 : 0);
		scope.unshift(this.app);
		scope.push("admin");
		return scope.join("_").toUpperCase();
	}
}

export default {
	mapScopes: {},
	levelScopes: {},
	cacheLevelScopes: {},
	cacheScopes: {},
	subs: {},
	joinLevel(key = {} || "", level = 0) {
		if (typeof key === "object") {
			Object.entries(key).forEach((v) => {
				this.joinLevel(v[0], v[1]);
			});
		} else {
			this.levelScopes[key] = level | (this.levelScopes[key] || 0);
		}
	},
	joinScopes(app = "", map = {}) {
		function enumeration(sub = {}) {
			Object.keys(sub).forEach((key) => {
				if (key.substr(0, 4) === "can_") {
					map[key] = sub[key];
				} else {
					enumeration(sub[key] || {});
				}
			});
		}
		enumeration(map);
		this.mapScopes[app] = map;
	},
	getCanScope(scope) {
		scope = scope.split(".");
		let can = scope.shift();
		return (
			scope.reduce((arr, key) => {
				return arr[key] || {};
			}, this.mapScopes)[can] || 0
		);
	},
	getLevelScope(scope) {
		scope = scope.split(".").slice(scope.substr(0, 4) == "can_" ? 1 : 0);
		if (this.cacheLevelScopes[scope.join(".")]) {
			return this.cacheLevelScopes[scope.join(".")];
		}
		let level = 0;
		let current = "";
		scope.forEach((key) => {
			current += current ? "." : "";
			current += key;
			level = level | (this.levelScopes[current] || 0);
		});
		return (this.cacheLevelScopes[scope.join(".")] = level);
	},
	checkHasScope(scope) {
		let not = 0;
		if (scope.substr(0, 1) === "!") {
			not = 1;
			scope = scope.substr(1);
		}
		return !!(this.getLevelScope(scope) & this.getCanScope(scope)) ^ not;
	},
	getRoleRoot(scope) {
		scope = scope.split(".").slice(scope.substr(0, 4) == "can_" ? 1 : 0);
		return scope.map((e, i) => {
			return scope
				.slice(0, i + 1)
				.push("root")
				.join("_")
				.toUpperCase();
		});
	},
	getRoleAdmin(scope) {
		scope = scope.split(".").slice(scope.substr(0, 4) == "can_" ? 1 : 0);
		scope.push("admin");
		return scope.join("_").toUpperCase();
	},
	sub(app = "") {
		if (!this.subs[app]) {
			this.subs[app] = new mScope(app, this);
		}
		return this.subs[app];
	},
};
