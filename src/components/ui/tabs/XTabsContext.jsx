import { createContext, useContext } from 'react';

export const XTabsContext = createContext(null);

export function useXTabsContext() {
	const ctx = useContext(XTabsContext);
	if (ctx === null) {
		throw new Error('XTabs component was not found in the tree');
	}
	return ctx;
}

export function XTabsProvider({ children, value }) {
	return <XTabsContext.Provider value={value}>{children}</XTabsContext.Provider>;
}
