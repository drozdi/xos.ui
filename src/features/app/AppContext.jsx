import { createContext, useContext } from "react";
export const AppContext = createContext(null);
export const AppProvider = ({ children, app, ...config }) => {
	return <AppContext.Provider value={app}>{children}</AppContext.Provider>;
};

export function useApp() {
	return useContext(AppContext);
}
