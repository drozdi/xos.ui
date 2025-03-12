import { createSafeContext } from "../../internal/createSafeContext";

export const [XTablerProvider, useXTableContext] = createSafeContext(
	"Table component was not found in the tree"
);
