import { isObject, isString } from '../utils/is';

export let Config = function Config(conf) {
	if (conf instanceof Config) {
		return conf;
	}
	if (!this || !this.add) {
		return new Config(conf);
	}
	this.conf = {};
	this.add(conf || {});
};

Config.prototype = {
	key: function (name) {
		return name;
		//return name.toLowerCase();
	},
	all: function () {
		return this.conf;
	},
	default: function (conf) {
		for (let name in conf) {
			if (!this.has(name)) {
				this.set(name, conf[name]);
			}
		}
	},
	add: function (conf) {
		for (let name in conf) {
			this.set(name, conf[name]);
		}
	},
	set: function (name, val) {
		this.conf[this.key(name)] = val;
		return val;
	},
	has: function (name) {
		return !!this.conf[this.key(name)] || false;
	},
	get: function (name, def) {
		let val = this.conf[this.key(name)] || def;
		while ((isString(val) && '@' === val.substr(0, 1)) || isObject(val)) {
			if (isObject(val) && (val.default || val.default !== undefined)) {
				val = val.default;
				continue;
			} else if (isObject(val)) {
				break;
			}
			val = this.resolveValue(val.substr(1));
			if (this.conf[this.key(val)]) {
				val = this.conf[this.key(val)];
			}
		}
		return this.resolveValue(val);
	},
	remove: function (name) {
		delete this.conf[this.key(name)];
	},

	resolveValue: function (value) {
		if (!isString(value)) {
			return value;
		}
		return this.unescapeValue(
			value.replace(
				/%%|%([^%\s]+)%/g,
				function (str, name) {
					if (str === '%%') {
						return '%%';
					}
					return this.get(name);
				}.bind(this),
			),
		);
	},
	escapeValue: function (value) {
		if (isString(value)) {
			return value.replace(/%/g, '%%');
		}
		return value;
	},
	unescapeValue: function (value) {
		if (isString(value)) {
			return value.replace(/%%/g, '%');
		}
		return value;
	},
};

Config.prototype.constructor = Config;
