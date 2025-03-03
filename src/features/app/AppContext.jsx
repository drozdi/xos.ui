import { createContext, useState } from "react";
import { useObjectState } from "../../shared/hooks";

export const AppContext = createContext({
	sm() {
		return {
			active: false,
			set(key, val) {
				return val;
			},
			get(key, val) {
				return val;
			},
			remove() {},
			save(fn = () => {}, ...args) {
				fn(...args);
			},
			no(fn = () => {}, ...args) {
				fn(...args);
			},
			useState(name, initial) {
				return useState(initial);
			},
			useObjectState(name, initial) {
				return useObjectState(initial);
			},
		};
	},
	$sm() {
		return this.sm();
	},
});
