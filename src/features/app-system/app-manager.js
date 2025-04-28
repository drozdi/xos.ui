import { useAppManager } from "./use-app-manager";
export const appManager = {
	register: useAppManager.getState().registerApp,
	launch: useAppManager.getState().launchApp,
	getConfig: (appId) => useAppManager.getState().apps[appId],
  };