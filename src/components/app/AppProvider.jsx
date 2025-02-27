import { EventBus } from "../../utils/EventBus";
import { AppContext } from "./AppContext";
import { XStorage } from "./hooks/useXStorage";
export const AppProvider = ({ children, smKey, ...config }) => {
	return (
		<AppContext.Provider
			value={{
				...config,
				smKey,
				sm(type) {
					return XStorage(type, smKey);
				},
				$sm(type) {
					return XStorage(type, smKey);
				},
				...new EventBus(),
				active(...args) {
					this.emit("activated", ...args);
				},
				deActive(...args) {
					this.emit("deactivated", ...args);
				},
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
