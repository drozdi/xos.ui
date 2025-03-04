import { createContext, useContext, useState } from "react";
import { useObjectState } from "../../shared/hooks";
import { EventBus } from "../../shared/utils/EventBus";
import { Storage } from "./lib/Storage";

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

export const AppProvider = ({ children, smKey, ...config }) => {
	return (
		<AppContext.Provider
			value={{
				...config,
				smKey,
				sm(type) {
					return Storage(type, smKey);
				},
				$sm(type) {
					return this.sm(type, smKey);
				},
				...new EventBus(),
				...{
					on: EventBus.prototype.on,
					one: EventBus.prototype.one,
					off: EventBus.prototype.off,
					emit: EventBus.prototype.emit,
				},
				active(...args) {
					this.emit("activated", ...args);
				},
				deActive(...args) {
					this.emit("deactivated", ...args);
				},
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export function useApp() {
	return useContext(AppContext);
}
