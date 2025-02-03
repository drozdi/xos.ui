import { Config } from './config';
import { Setting } from './setting';
let sortHKey = 'USER APP WIN'.split(/\s+/);

export let SettingManager = function (HKEYS) {
	if (HKEYS instanceof SettingManager) {
		return HKEYS;
	}
	if (!this || !this.join) {
		return new SettingManager(HKEYS);
	}
	for (let name in HKEYS) {
		this.join(HKEYS[name], name);
	}
};
SettingManager.prototype = {
	join: function (setting, name) {
		name = (name || setting._key || '').toUpperCase();
		if (name === 'HKEY_CONFIG' && setting instanceof Config) {
			Object.defineProperty(this, name, {
				value: setting,
				writable: true,
				enumerable: true,
			});
		} else if (setting instanceof Setting) {
			Object.defineProperty(this, name, {
				value: setting,
				writable: true,
				enumerable: true,
			});
		}
	},
	newSetting: function (name, options, keyName) {
		name = name.toUpperCase();
		Object.defineProperty(this, name, {
			value: Setting(this.HKEY_CONFIG || null, options || {}, keyName || name),
			writable: true,
			enumerable: true,
		});
	},
	get: function (key, def) {
		let val,
			KEYS = sortHKey.slice();
		KEYS.concat(Object.keys(this));
		KEYS = KEYS.filter(function (key, index, arr) {
			return index === arr.lastIndexOf(key) && key !== 'HKEY_CONFIG' && this[key];
		}, this);
		KEYS.push('HKEY_CONFIG');
		KEYS.forEach(function (name) {
			if (null !== val) {
				return;
			}
			val = this[name].get(key, null);
		}, this);
		return val || def;
	},
};
SettingManager.prototype.constructor = SettingManager;
