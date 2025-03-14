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

XMarkupTable.Tr = ({ children, className, ...props }) => {
	return (
		<tr {...props} className={classNames("x-table-tr", className)}>
			{children}
		</tr>
	);
};
XMarkupTable.Tr.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

XMarkupTable.Td = ({ children, className, ...props }) => {
	return (
		<td {...props} className={classNames("x-table-td", className)}>
			{children}
		</td>
	);
};
XMarkupTable.Td.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

XMarkupTable.Th = ({ children, className, ...props }) => {
	return (
		<th {...props} className={classNames("x-table-th", className)}>
			{children}
		</th>
	);
};
XMarkupTable.Th.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

XMarkupTable.Thead = ({ children, className, ...props }) => {
	return (
		<thead {...props} className={classNames("x-table-thead", className)}>
			{children}
		</thead>
	);
};
XMarkupTable.Thead.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

XMarkupTable.Tbody = ({ children, className, ...props }) => {
	return (
		<tbody {...props} className={classNames("x-table-tbody", className)}>
			{children}
		</tbody>
	);
};
XMarkupTable.Tbody.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

XMarkupTable.Tfoot = ({ children, className, ...props }) => {
	return (
		<tfoot {...props} className={classNames("x-table-tfoot", className)}>
			{children}
		</tfoot>
	);
};
XMarkupTable.Tfoot.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

XMarkupTable.Caption = ({ children, className, ...props }) => {
	return (
		<caption
			{...props}
			className={classNames("x-table-caption", className)}
		>
			{children}
		</caption>
	);
};
XMarkupTable.Caption.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

XMarkupTable.Tr.displayName = "XMarkupTableTr";
XMarkupTable.Td.displayName = "XMarkupTableTd";
XMarkupTable.Th.displayName = "XMarkupTableTh";
XMarkupTable.Thead.displayName = "XMarkupTableThead";
XMarkupTable.Tbody.displayName = "XMarkupTableTbody";
XMarkupTable.Tfoot.displayName = "XMarkupTableTfoot";
XMarkupTable.Caption.displayName = "XMarkupTableCaption";
