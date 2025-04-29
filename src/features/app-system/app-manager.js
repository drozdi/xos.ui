import { createRoot, useAppManager } from "./use-app-manager";
export const appManager = {
	register: useAppManager.getState().register,
	reloadApps: useAppManager.getState().reloadApps,
	createApp: useAppManager.getState().createApp,
	closeAll: useAppManager.getState().closeAll,
	buildApp: useAppManager.getState().buildApp,
	createRoot: createRoot
  };