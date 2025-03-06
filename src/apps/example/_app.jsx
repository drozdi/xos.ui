import { AppProvider } from "../../features/app";
export function App_Example({ smKey, children }) {
	return <AppProvider smKey={smKey}>{children}</AppProvider>;
}
