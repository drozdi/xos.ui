import PropTypes from "prop-types";
import React, { memo, useEffect } from "react";
import { useId } from "../../hooks/";
import { useXTableColumsContext } from "./XTableColumsContext";

const calculateColspan = (children) => {
	if (!children) return 1;
	return React.Children.toArray(children).reduce((sum, child) => {
		return sum + calculateColspan(child.props.children);
	}, 0);
};
const calculateIsColumns = (children) => {
	if (!children) return false;
	return React.Children.count(children) > 0;
};
let id = 0;

export const XColumn = memo((props) => {
	const ctx = useXTableColumsContext();
	const uid = useId();
	const registerColumns = (column, level = 0, uid) => {
		const col = {
			uid: `${uid}-${id++}`,
			size: 1,
			level: level + 1,
			parentLevel: level,
			columns: [],
			isColumns: calculateIsColumns(column.props.children),
			isHeader: !!column.props.header,
			isField: !!column.props.field,
			isEmpty: !column.props.field,
			colspan:
				calculateColspan(column.props.children) ||
				column.props.size ||
				1,
			...column.props,
			children: undefined,
		};

		if (column.props.children) {
			React.Children.forEach(column.props.children, (child) => {
				col.columns.push(
					registerColumns(child, col.level, col.isHeader)
				);
			});
		}

		level === 0 && ctx.addColumn(col);

		return col;
	};

	useEffect(() => {
		registerColumns({ props }, 0, uid);
	}, [props]);

	return null;
});

XColumn.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	header: PropTypes.string,
	field: PropTypes.string,
	size: PropTypes.number,
	sortable: PropTypes.bool,
	isGroup: PropTypes.bool,
	isGrouped: PropTypes.bool,
	isSorted: PropTypes.bool,
	align: PropTypes.oneOf(["left", "right", "center"]),
};
