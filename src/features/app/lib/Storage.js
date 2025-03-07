import { useEffect, useState } from "react";
import settingManager from "../../../entites/core/setting-manager";
import { useStateObject } from "../../../shared/hooks";
import { cached } from "../../../shared/utils/cached";

export const Storage = cached(function StorageFn(type, key) {
	let smActive = false;
	let sm = {
		set(key, val) {
			return val;
		},
		get(key, def, type = null) {
			return def;
		},
		remove(key) {},
	};

	if (settingManager[type] && key) {
		sm = settingManager[type].sub(key);
	} else if (key === "core") {
		sm = settingManager["APP"].sub(key);
	}

	/*useEffect(() => {
		smActive = true;
		return () => sm.remove();
	}, []);*/

	return {
		type,
		key,
		get active() {
			return smActive;
		},
		set active(val) {
			smActive = val;
		},
		set(key, val) {
			smActive && sm.set(key, val);
			return val;
		},
		get(key, val, type = null) {
			return sm.get(key, val, type);
		},
		remove(key) {
			smActive && sm.remove(key);
		},
		save(fn = () => {}, ...args) {
			let old = smActive;
			smActive = true;
			fn(...args);
			smActive = old;
		},
		no(fn = () => {}, ...args) {
			let old = smActive;
			smActive = false;
			fn(...args);
			smActive = old;
		},
		useState(name, initial) {
			const [state, setState] = useState(
				initial || this.get(name, initial)
			);
			useEffect(() => {
				this.set(name, state);
			}, [state, name]);
			return [state, setState];
		},
		useStateObject(name, initial) {
			const [state, updateState] = useStateObject(
				this.get(name, initial)
			);
			useEffect(() => {
				this.set(name, state);
			}, [state, name]);
			return [state, updateState];
		},
		useStateProxy(name, initial) {
			const [state, dispatch] = useState(this.get(name, initial));
			useEffect(() => {
				this.set(name, state);
			}, [state, name]);
			return new Proxy(state, {
				get(target, property) {
					if (property in target) {
						return target[property];
					}
					return undefined;
				},
				set(target, property, value) {
					dispatch((v) => ({ ...v, [property]: value }));
					target[property] = value;
					return true;
				},
				has(target, property) {
					return property in target;
				},
				ownKeys(target) {
					return Object.keys(target);
				},
				deleteProperty(target, property) {
					dispatch((v) => ({ ...v, [property]: undefined }));
					delete target[property];
					return true;
				},
			});
		},
	};
});
