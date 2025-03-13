import PropTypes from "prop-types";
import { useEffect, useMemo, useRef } from "react";
import {
	useXTableColumsContext,
	XTablerColumsProvider,
} from "./XTableColumsContext";
export const XColumn = ({ children, ...props }) => {
	const ctx = useXTableColumsContext();
	const columns = useRef([]);
	const col = useMemo(
		() => ({
			size: 1,
			level: ctx.level + 1,
			columns: columns.current,
			isColumns: columns.current.length > 0,
			isHeader: !!props.header,
			isField: !!props.field,
			isEmpty: !props.field,
			colspan:
				columns.current.reduce((sum, column) => {
					return sum + column.colspan;
				}, 0) ||
				props.size ||
				1,
			...props,
		}),
		[columns.current, props]
	);
	useEffect(() => {
		ctx.columns.push(col);
		return () => {
			ctx.columns = ctx.columns.filter((v) => v != col);
		};
	}, [col]);

	const context = useMemo(
		() => ({
			get columns() {
				return columns.current;
			},
			set columns(columns) {
				columns.current = columns;
			},
			level: ctx.level + 1,
		}),
		[]
	);
	return (
		<XTablerColumsProvider value={context}>
			{children}
		</XTablerColumsProvider>
	);
};

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
