import { createSafeContext } from "../../internal/createSafeContext";

export const [XPopoverProvider, useXPopoverContext] = createSafeContext(
	"XPopover component was not found in the tree"
);
