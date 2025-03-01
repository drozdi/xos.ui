import { createContext, useContext } from "react";

/**
 * Создает безопасный контекст с обработкой ошибок.
 *
 * @param {string} errorMessage - Сообщение об ошибке, если контекст используется вне провайдера.
 * @returns {Array} Массив, содержащий Provider и useSafeContext.
 */
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
