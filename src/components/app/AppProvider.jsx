import { AppContext } from "./AppContext";
import { XStorage } from "./hooks/useXStorage";
export const AppProvider = ({ children, smKey, ...config }) => {
	return (
		<AppContext.Provider
			value={{
				...config,
				smKey,
				$sm(type) {
					return XStorage(type, smKey);
				},
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
