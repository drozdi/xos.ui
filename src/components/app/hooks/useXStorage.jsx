import { createContext, useEffect } from 'react';
import settingManager from '../../../core/setting-manager';
import { cached } from '../../../utils/cached';

export const XStorage = cached(function XStorage(type, key) {
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
	} else if (key === 'core') {
		sm = settingManager['APP'].sub(key);
	}
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
			let state = this.get(name, initial);
			const setState = (newState) => {
				state = { ...state, ...newState };
			};
			//const [state, setState] = useState(this.get(name, initial));
			useEffect(() => {
				this.set(name, state);
			}, [state]);
			return [state, setState]; //*/
		},
	};
});

export const XStorageContext = createContext({
	get(key, def, type = null) {
		return def;
	},
	set(key, val) {
		return val;
	},
	save(fn = () => {}, ...args) {
		fn(...args);
	},
	no(fn = () => {}, ...args) {
		fn(...args);
	},
	remove(key) {},
});
export function XStorageProvider({ children, type, key }) {
	return (
		<XStorageContext.Provider value={XStorage(type, key)}>
			{children}
		</XStorageContext.Provider>
	);
}

export function useXStorage(type, key) {
	let smActive = false;
	let sm = {
		set(key, val) {
			return val;
		},
		get(key, val, type = null) {
			return val;
		},
		remove(key) {},
	};

	if (settingManager[type] && key) {
		sm = settingManager[type].sub(key);
	} else if (key === 'core') {
		sm = settingManager['APP'].sub(key);
	}
	useEffect(() => {
		smActive = true;
		return () => sm.remove();
	}, []);

	return {
		active(active = true) {
			smActive = active;
		},
		set(key, val) {
			smActive && sm.set(key, val);
			return val;
		},
		get(key, val, type = null) {
			return sm.get(key, val, type);
		},
		save(fn = () => {}) {
			let args = [].slice.call(arguments, 1);
			let old = smActive;
			smActive = true;
			fn(...args);
			smActive = old;
		},
		noSave(fn = () => {}) {
			let args = [].slice.call(arguments, 1);
			let old = smActive;
			smActive = false;
			fn(...args);
			smActive = old;
		},
		join(name, initial = null) {
			/*const [state, setState] = useState(initial);
			useEffect(() => {
				this.set(name, state);
			}, [state]);
			return [state, setState];*/
			let state = this.get(name, initial);
			const setState = (newState) => {
				state = { ...state, ...newState };
				this.set(name, state);
			};
			//const [state, setState] = useState(this.get(name, initial));
			/*useEffect(() => {
				this.set(name, state);
			}, [state]);*/
			return [state, setState]; //*/
		},
	};
}
