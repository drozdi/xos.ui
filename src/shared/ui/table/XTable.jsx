import PropTypes from "prop-types";
import { memo } from "react";

import { Box } from "../../internal/box";
import { forwardRefWithAs } from "../../internal/render";
import { XTablerProvider } from "./XTableContext";
import "./style.css";

export const XTable = memo(
	forwardRefWithAs(function XTableFn({ children }) {
		return (
			<XTablerProvider value={{}}>
				<Box as="table" noPadding>
					{children}
				</Box>
			</XTablerProvider>
		);
	})
);

XTable.propTypes = {
	children: PropTypes.node,
};
