import { useEffect } from "react";
import { EventBus } from "../../../shared/utils/EventBus";
import { HistoryStore } from "./History";
import { Storage } from "./Storage";

export class App extends EventBus {
	constructor(smKey) {
		super();
		this.root = null;
		this.smKey = smKey;
		this.__history = {
			current: null,
		};
		this.on("close", () => {
			this.unmount();
		});
		"remove close reload".split(/\s+/).forEach((evt) => {
			this[evt] = (...args) => this.emit(evt, ...args);
		});
	}
	default(config = {}) {
		this.__config = config;
	}
	config(key = "") {
		const conf = {};
		for (let name in this.__config) {
			if (name.indexOf(key + ".") !== 0) {
				continue;
			}
			conf[name.replace(key + ".", "")] = this.__config[name];
		}
		return conf;
	}
	history(fn) {
		if (!this.__history.current) {
			this.__history.current = HistoryStore(fn);
		}
		const store = this.__history.current();

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
	}
	sm(type) {
		return Storage(type, this.smKey);
	}
	active(...args) {
		this.emit("activated", ...args);
	}
	deActive(...args) {
		this.emit("deactivated", ...args);
	}
	unmount() {
		const container = this.root?._internalRoot.containerInfo;
		this.root?.unmount();
		if (container) {
			container.remove();
		}
	}
}
