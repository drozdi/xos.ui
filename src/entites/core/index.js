import appsManager from "./apps-manager";
import config from "./config";
import roles from "./roles";
import scopes from "./scopes";
import settingManager from "./setting-manager";

const core = {
	$config: config,
	$sm: settingManager,
	$scopes: scopes,
	$roles: roles,
	$apps: appsManager,
	list: {},
	app(proto, conf = {}, app) {
		const _app = app ?? appsManager.createRoot();
		if (!this.list[proto.displayName]) {
			_app.render(
				(this.list[proto.displayName] = appsManager.buildApp(proto, {
					app: _app,
					...conf,
				}))
			);
		}
		return this.list[proto.displayName];
	},
	joinScopes(app = "", map = {}) {
		this.$scopes.joinScopes(app, map);
	},
	getCanScope(scope) {
		return this.$scopes.getCanScope(scope);
	},
	getLevelScope(scope) {
		return this.$scopes.getLevelScope(scope);
	},
	checkHasScope(scope) {
		return this.$scopes.checkHasScope(scope);
	},
};

export default core;
