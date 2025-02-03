import { createContext, useContext } from 'react';

export function createSafeContext(errorMessage) {
	const Context = createContext(null);

	const useSafeContext = () => {
		const ctx = useContext(Context);

		if (ctx === null && errorMessage) {
			throw new Error(errorMessage);
		}

		return ctx;
	};

	const Provider = ({ children, value }) => (
		<Context.Provider value={value}>{children}</Context.Provider>
	);

	return [Provider, useSafeContext];
}
