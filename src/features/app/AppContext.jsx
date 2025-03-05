import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useForceUpdate, useObjectState } from "../../shared/hooks";
import { EventBus } from "../../shared/utils/EventBus";
import { History } from "./lib/History";
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
	const history = useRef();
	return (
		<AppContext.Provider
			value={{
				...config,
				smKey,
				history(fn) {
					if (!history.current) {
						history.current = new History(fn);
					}

					const forceUpdate = useForceUpdate();

					const [h, sh] = this.sm("APP").useState("history", {
						histories: history.current?.histories,
						index: history.current?.index,
					});

					useEffect(() => {
						sh({
							histories: history.current?.histories,
							index: history.current?.index,
						});
						this.emit("history");
					}, [history.current.histories, history.current.index]);

					useEffect(() => {
						this.on("history", forceUpdate);
						history.current?.init(h);
						this.sm("APP").active = true;
						return () => {
							this.off("history", forceUpdate);
							this.sm("APP").remove("history");
						};
					}, []);

					return history.current;
				},

				sm(type) {
					return Storage(type, smKey);
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
