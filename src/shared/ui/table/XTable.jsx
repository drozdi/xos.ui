import PropTypes from "prop-types";
import { memo } from "react";

import classNames from "classnames";
import { forwardRefWithAs } from "../../internal/render";
import { XTablerProvider } from "./XTableContext";
import "./style.css";

export const XTable = memo(
	forwardRefWithAs(function XTableFn({
		children,
		className,
		striped,
		hover,
		dense,
		rowBorder,
		colBorder,
		border,
	}) {
		return (
			<XTablerProvider value={{}}>
				<table
					className={classNames(
						"x-table",
						{
							"x-table--striped": striped,
							"x-table--hover": hover,
							"x-table--dense": dense,
							"x-table--row-border": rowBorder,
							"x-table--col-border": colBorder,
							"x-table--border": border,
						},
						className
					)}
				>
					{children}
				</table>
			</XTablerProvider>
		);
	})
);

XTable.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	striped: PropTypes.bool,
	hover: PropTypes.bool,
	dense: PropTypes.bool,
	rowBorder: PropTypes.bool,
	colBorder: PropTypes.bool,
	border: PropTypes.bool,
};

XTable.Tr = ({ children, className }) => {
	return <tr className={classNames("x-table-tr", className)}>{children}</tr>;
};
XTable.Td = ({ children, className }) => {
	return <td className={classNames("x-table-td", className)}>{children}</td>;
};
XTable.Th = ({ children, className }) => {
	return <th className={classNames("x-table-th", className)}>{children}</th>;
};
XTable.Thead = ({ children, className }) => {
	return (
		<thead className={classNames("x-table-thead", className)}>
			{children}
		</thead>
	);
};
XTable.Tbody = ({ children, className }) => {
	return (
		<tbody className={classNames("x-table-tbody", className)}>
			{children}
		</tbody>
	);
};
XTable.Tfoot = ({ children, className }) => {
	return (
		<tfoot className={classNames("x-table-tfoot", className)}>
			{children}
		</tfoot>
	);
};
XTable.Caption = ({ children, className }) => {
	return (
		<caption className={classNames("x-table-caption", className)}>
			{children}
		</caption>
	);
};
