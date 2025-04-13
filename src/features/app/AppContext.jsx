import { createContext, useContext } from "react";
import { ResizeObserverProvider } from "../../shared/internal/context";
export const AppContext = createContext(null);
export const AppProvider = ({ children, app, ...config }) => {
	return (
		<AppContext.Provider value={app}>
			<ResizeObserverProvider boxModel="border-box">
				{children}
			</ResizeObserverProvider>
		</AppContext.Provider>
	);
};

export function useApp() {
	return useContext(AppContext);
}
