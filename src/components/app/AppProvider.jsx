import { AppContext } from "./AppContext";
import { XStorage } from "./hooks/useXStorage";
export const AppProvider = ({ children, config = {} }) => {
	const smKey = config.smKey;
	return (
		<AppContext.Provider
			value={{
				config,
				$sm(type) {
					return XStorage(type, smKey);
				},
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
