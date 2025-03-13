import PropTypes from "prop-types";
import { memo } from "react";

import classNames from "classnames";
import { forwardRefWithAs } from "../../internal/render";
import "./style.css";

export const XMarkupTable = memo(
	forwardRefWithAs(function XMarkupTableFn(
		{
			children,
			className,
			striped,
			hover,
			dense,
			rowBorder,
			colBorder,
			border,
			layout,
		},
		ref
	) {
		return (
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
						[`x-table--${layout}`]: layout,
					},
					className
				)}
			>
				{children}
			</table>
		);
	})
);

XMarkupTable.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	striped: PropTypes.bool,
	hover: PropTypes.bool,
	dense: PropTypes.bool,
	rowBorder: PropTypes.bool,
	colBorder: PropTypes.bool,
	border: PropTypes.bool,
	layout: PropTypes.oneOf(["fixed", "auto"]),
};

XMarkupTable.Tr = ({ children, className }) => {
	return <tr className={classNames("x-table-tr", className)}>{children}</tr>;
};
XMarkupTable.Td = ({ children, className }) => {
	return <td className={classNames("x-table-td", className)}>{children}</td>;
};
XMarkupTable.Th = ({ children, className }) => {
	return <th className={classNames("x-table-th", className)}>{children}</th>;
};
XMarkupTable.Thead = ({ children, className }) => {
	return (
		<thead className={classNames("x-table-thead", className)}>
			{children}
		</thead>
	);
};
XMarkupTable.Tbody = ({ children, className }) => {
	return (
		<tbody className={classNames("x-table-tbody", className)}>
			{children}
		</tbody>
	);
};
XMarkupTable.Tfoot = ({ children, className }) => {
	return (
		<tfoot className={classNames("x-table-tfoot", className)}>
			{children}
		</tfoot>
	);
};
XMarkupTable.Caption = ({ children, className }) => {
	return (
		<caption className={classNames("x-table-caption", className)}>
			{children}
		</caption>
	);
};
