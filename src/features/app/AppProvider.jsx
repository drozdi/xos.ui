import { EventBus } from "../../shared/utils/EventBus";
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
				...{
					on: EventBus.prototype.on,
					one: EventBus.prototype.one,
					off: EventBus.prototype.off,
					emit: EventBus.prototype.emit,
				},
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
