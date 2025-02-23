import { createSafeContext } from "../../internal/createSafeContext";

export const [XLayoutProvider, useXLayoutContext] =
	createSafeContext(/*"XLayoutContext should be used within the XLayoutContext provider!"*/);
