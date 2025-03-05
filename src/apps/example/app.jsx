import { AppProvider } from "../../features/app";
import { App_Int } from "./_int";
export function AppExample({ smKey }) {
	return (
		<AppProvider smKey={smKey}>
			<App_Int />
		</AppProvider>
	);
}
