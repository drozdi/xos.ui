import { createRoot } from "react-dom/client";
import { AppProvider } from "../../features/app";
import { App } from "../../features/app/lib/App";
import { parameterize } from "../../shared/utils/request";
import settingManager from "./setting-manager";

const appsManager = {
	id: 0, // Идентификатор приложения
	activeApp: null, // Активное приложение
	apps: {}, // Зарегистрированные приложения
	runs: {}, // Запущенные приложения
	register(appName, conf = {}) {
		this.apps[this.getName(appName)] = conf;
	},
	get(appName) {
		return this.apps[this.getName(appName)];
	},
	getName(appName) {
		return appName.displayName || appName;
	},
	get$App(instance) {
		return instance?.props?.app || instance;
	},
	genId() {
		return "app-" + String(this.id++);
	},
	genPath(conf) {
		return parameterize(conf.pathName || "", conf);
	},

	constApp(conf, pathName = null) {
		const $app = new App(conf);
		$app.pathName = conf.pathName;
		$app.on("activated", () => {
			this.activeApp = pathName;
		});
		$app.on("deactivated", () => {
			if (this.activeApp === pathName) {
				this.activeApp = null;
			}
		});
		$app.on("close", () => {
			this.removeApp($app);
			this.unMountRoot($app);
		});
		return $app;
	},
	providerApp(Component, { app, ...conf }) {
		return (app.element = (
			<AppProvider app={app}>
				<Component {...conf} />
			</AppProvider>
		));
	},
	buildApp(Component, { smKey, ..._conf } = {}, mount = true) {
		try {
			let { pathName, ...conf } = {
				...(this.apps[this.getName(Component)] || {}),
				..._conf,
			};

			Component = {
				component: Component,
				...this.get(Component),
			}.component;

			pathName = this.genPath({ pathName, ...conf });

			if (!pathName) {
				return this.providerApp(Component, {
					app: this.constApp({ smKey }),
					...conf,
				});
			}

			if (!this.runs[pathName]) {
				this.runs[pathName] = this.providerApp(Component, {
					app: this.constApp({ smKey }, pathName),
					...conf,
				});
				mount && this.mountRoot(this.runs[pathName]);
			} else {
				this.runs[pathName].active();
			}

			return this.runs[pathName];
		} catch (error) {
			console.error("Error building app:", error);
			throw error;
		}
	},
	createRoot() {
		const container = document.createElement("div");
		document.body.prepend(container);
		return createRoot(container);
	},
	mountRoot(app) {
		try {
			app = this.get$App(app);
			if (!app.root) {
				app.root = this.createRoot();
			}
			app.root.render(app.element);
		} catch (error) {
			console.error("Error mounting app:", error);
			throw error;
		}
	},
	unMountRoot(app) {
		try {
			const container = app.root?._internalRoot.containerInfo;
			app.root?.unmount();
			if (container) {
				container.remove();
			}
		} catch (error) {
			console.error("Error unmounting app:", error);
			throw error;
		}
	},

	createApp(Component, conf = {}, save = true) {
		try {
			conf.smKey = conf.smKey ?? this.genId();
			const $app = this.get$App(this.buildApp(Component, conf));
			if ($app.smKey === conf.smKey && save) {
				let runs = settingManager.APP.get("run", []);
				runs.push($app.smKey);
				settingManager.APP.set($app.smKey, {
					id: this.id,
					conf: conf,
					smKey: $app.smKey,
					appName: this.getName(Component),
				});
				settingManager.APP.set("run", runs);
			}
		} catch (error) {
			console.error("Error creating app:", error);
			throw error;
		}
	},
	removeApp($app) {
		try {
			$app = this.get$App($app);
			let smKey = $app.smKey;
			let pathName = $app.pathName;
			let runs = settingManager.APP.get("run", []);
			runs = runs.filter((val) => val != smKey);
			settingManager.APP.remove(smKey);
			settingManager.APP.set("run", runs);
			delete this.runs[pathName];
		} catch (error) {
			console.error("Error removing app:", error);
			throw error;
		}
	},
	reloadApps() {
		try {
			let runs = settingManager.APP.get("run", []);
			runs.forEach((smKey) => {
				let info = settingManager.APP.get(smKey, {
					id: 0,
					conf: {},
					smKey: smKey,
					appName: "",
				});
				this.id = Math.max(info.id, this.id);
				let Component = info.appName;
				this.buildApp(Component, info.conf);
			});
		} catch (error) {
			console.error("Error reloading apps:", error);
			throw error;
		}
	},

	// Закрытие всех приложений
	closeAll() {
		try {
			Object.values(this.runs).forEach((app) => {
				app.close();
			});
			this.runs = {};
		} catch (error) {
			console.error("Error closing all apps:", error);
			throw error;
		}
	},
	// Активация приложения
	activate(appName) {
		if (this.activeApp) {
			this.deactivate(this.activeApp);
		}
		this.activeApp = appName;
		console.log(`App ${appName} activated`);
	},

	deactivate(appName) {
		if (this.activeApp === appName) {
			this.activeApp = null;
			console.log(`App ${appName} deactivated`);
		}
	},
};

export default appsManager;
