import { useEffect, useState } from "react";
import settingManager from "../../../entites/core/setting-manager";
import { useObjectState } from "../../../shared/hooks";
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
			const [state, setState] = useState(this.get(name, initial));
			useEffect(() => {
				this.set(name, state);
			}, [state]);
			return [state, setState];
		},
		useObjectState(name, initial) {
			const [state, updateState] = useObjectState(
				this.get(name, initial)
			);
			useEffect(() => {
				this.set(name, state);
			}, [state]);
			return [state, updateState];
		},
	};
});
