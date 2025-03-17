import PropTypes from "prop-types";
import { memo } from "react";

import classNames from "classnames";
import { forwardRefWithAs, render } from "../../internal/render";
import { capitalize } from "../../utils/string";
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
			showTitle,
			...props
		},
		ref
	) {
		return render("table", {
			...props,
			className: classNames(
				"x-table",
				{
					"x-table--striped": striped,
					"x-table--hover": hover,
					"x-table--dense": dense,
					"x-table--row-border": rowBorder,
					"x-table--col-border": colBorder,
					"x-table--border": border,
					"x-table--show-title": showTitle,
					[`x-table--${layout}`]: layout,
				},
				className
			),
			ref,
			children,
		});
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
	showTitle: PropTypes.bool,
	layout: PropTypes.oneOf(["fixed", "auto"]),
};

"tr td th thead tbody tfoot caption".split(/\s+/).forEach((name) => {
	XMarkupTable[capitalize(name)] = memo(
		({ children, className, ...props }) => {
			return render(name, {
				...props,
				className: classNames("x-table-" + name, className),
				children,
			});
		}
	);
	XMarkupTable[capitalize(name)].displayName =
		"XMarkupTable" + capitalize(name);
});
