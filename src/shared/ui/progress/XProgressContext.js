import { createContext, useContext } from 'react';

export const XProgressContext = createContext(null);

export function useXProgressContext() {
	const context = useContext(XProgressContext);
	return context;
}
