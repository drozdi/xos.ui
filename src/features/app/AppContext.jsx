import { createContext, useContext, useEffect, useRef } from "react";
import { EventBus } from "../../shared/utils/EventBus";
import { HistoryStore } from "./lib/History";
import { Storage } from "./lib/Storage";
export const AppContext = createContext(null);
export const AppProvider = ({ children, app, smKey, ...config }) => {
	const history = useRef();
	const context = {
		app: app ?? useApp()?.app,
		...config,
		smKey,
		history(fn) {
			if (!history.current) {
				history.current = HistoryStore(fn);
			}
			const store = history.current();

			const [h, sh] = this.sm("APP").useState("history", {
				histories: store.histories,
				index: store.index,
			});

			useEffect(() => {
				sh({
					histories: store.histories,
					index: store?.index,
				});
			}, [store.histories, store.index]);

			useEffect(() => {
				store.init(h);
				this.sm("APP").active = true;
				return () => {
					this.sm("APP").remove("history");
				};
			}, []);

			return store;
		},

		sm(type) {
			return Storage(type, smKey);
		},
		...new EventBus({
			close: () => context.unmount(),
		}),
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
		close(...args) {
			this.emit("close", ...args);
		},
		unmount() {
			const container = this.app?._internalRoot.containerInfo;
			this.app?.unmount();
			if (container) {
				container.remove();
			}
		},
	};
	context.app._x = context;
	return (
		<AppContext.Provider value={context}>{children}</AppContext.Provider>
	);
};

export function useApp() {
	return useContext(AppContext);
}
