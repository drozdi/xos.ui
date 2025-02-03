import { createContext, useState } from 'react';

export const AppContext = createContext({
	$sm() {
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
		};
	},
});
