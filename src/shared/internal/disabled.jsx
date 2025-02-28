import React, { createContext, useContext } from 'react';

let DisabledContext = createContext(undefined);

export function useDisabled() {
	return useContext(DisabledContext);
}

export function DisabledProvider({ value, children }) {
	return <DisabledContext.Provider value={value}>{children}</DisabledContext.Provider>;
}
