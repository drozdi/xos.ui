import { createSafeContext } from "../../internal/createSafeContext";

export const [XTablerColumsProvider, useXTableColumsContext] =
	createSafeContext("XTable component was not found in the tree");
