import { createRoot } from "react-dom/client";
import { AppProvider } from "../../features/app";
import { App } from "../../features/app/lib/App";
import { parameterize } from "../../shared/utils/request";

const appsManager = {
	id: 0,
	defs: {},
	runs: {},
	append(proto, conf = {}) {
		this.defs[proto.displayName] = conf || {};
	},
	genPath(conf) {
		return parameterize(conf.pathName || "", conf);
	},
	genId() {
		return "app-" + String(this.id++);
	},
	get$App(instance) {
		return instance?.props?.app || app;
	},
	_buildApp(Proto, { app, ...conf }) {
		return (app.element = (
			<AppProvider app={app}>
				<Proto {...conf} />
			</AppProvider>
		));
	},
	buildApp(Proto, { smKey, ..._conf }, mount = true) {
		let { pathName, ...conf } = {
			...(this.defs[Proto.displayName] || {}),
			..._conf,
		};
		pathName = this.genPath({ pathName, ...conf });
		if (!pathName) {
			return this._buildApp(Proto, { app: new App(smKey), ...conf });
		}
		if (!this.runs[pathName]) {
			this.runs[pathName] = this._buildApp(Proto, {
				app: new App(smKey),
				...conf,
			});
			this.get$App(this.runs[pathName]).on("close", () => {
				delete this.runs[pathName];
			});
			mount && this.mountRoot(this.runs[pathName]);
		} else {
			this.get$App(this.runs[pathName])?.active();
		}
		return this.runs[pathName];
	},
	createRoot() {
		const wrapper = document.createElement("div");
		document.body.prepend(wrapper);
		return createRoot(wrapper);
	},
	mountRoot(app) {
		app = this.get$App(app);
		app.root = this.createRoot();
		app.root.render(app.element);
	},
	createApp(proto, { smKey, ...conf }, save = true) {
		smKey = smKey ?? this.genId();
		this.buildApp(proto, { smKey, ...conf });
	},
};

export default appsManager;
