import { createSafeContext } from "../../internal/createSafeContext";

export const [XTablerProvider, useXTableContext] = createSafeContext(
	"XTable component was not found in the tree"
);
