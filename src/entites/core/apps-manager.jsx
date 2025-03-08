import { createRoot } from "react-dom/client";
import { AppProvider } from "../../features/app";
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
		return instance.props.app._x;
	},
	_buildApp(Proto, { smKey, app, pathName, ...conf }) {
		return (
			<AppProvider smKey={smKey} app={app}>
				<Proto {...conf} />
			</AppProvider>
		);
	},
	buildApp(Proto, { smKey, app, ...conf }, mount = true) {
		conf = { ...(this.defs[Proto.displayName] || {}), ...conf };
		let pathName = this.genPath(conf);
		if (pathName) {
			if (!this.runs[pathName]) {
				this.runs[pathName] = this._buildApp(Proto, {
					smKey,
					app,
					...conf,
				});
			} else {
				console.log(this.get$App(this.runs[pathName]));
				this.get$App(this.runs[pathName])?.active();
			}
			return this.runs[pathName];
		}
		return this._buildApp(Proto, { smKey, app, ...conf });
	},
	createRoot() {
		const wrapper = document.createElement("div");
		document.body.prepend(wrapper);
		return createRoot(wrapper);
	},
	createApp(proto, { smKey, ...conf }, mount = true) {
		let _smKey = smKey || this.genId();
		const app = this.createRoot();
		app.render(this.buildApp(proto, { smKey: _smKey, app, ...conf }));
	},
};

export default appsManager;
