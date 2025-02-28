import { createSafeContext } from "../../internal/createSafeContext";

export const [XTabsProvider, useXTabsContext] = createSafeContext(
	"XTabs component was not found in the tree"
);
