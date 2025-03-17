import { createSafeContext } from "../../internal/createSafeContext";

export const [XPaginationProvider, useXPaginationContext] = createSafeContext(
	"XPagination component was not found in tree"
);
