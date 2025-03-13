import PropTypes from "prop-types";
import { useMemo, useRef } from "react";
import { isFunction } from "../../utils/is";
import { XTablerColumsProvider } from "./XTableColumsContext";

export const XTable = ({ children, className, ...props }) => {
	props.groupAt = props.groupAt || "begin";
	function editable(data, index) {
		return isFunction(props.editable)
			? props.editable(data, index)
			: props.editable;
	}
	const columnsRef = useRef([]);
	const ctx = useMemo(
		() => ({
			get columns() {
				return columnsRef.current;
			},
			set columns(columns) {
				columnsRef.current = columns;
			},
			level: 0,
		}),
		[]
	);

	const columns = useMemo(
		() =>
			[...columnsRef.current].sort((a, b) => {
				if (a.isGrouped) {
					return props.groupAt === "begin" ? -1 : 1;
				}
				if (b.isGrouped) {
					return props.groupAt === "begin" ? 1 : -1;
				}
				return 0;
			}),
		[columnsRef.current]
	);

	const fields = useMemo(() => {
		let ret = [];
		(function recursive(columns) {
			for (let i = 0, cnt = columns.length; i < cnt; i++) {
				if (columns[i].isEmpty && columns[i].isColumns) {
					recursive(columns[i].columns);
				} else {
					ret.push(columns[i]);
				}
			}
		})(columns);
		return ret.filter(
			(v) =>
				v.field &&
				(props.column?.isGrouped || v.field != props.column?.field)
		);
	}, [columns, columnsRef]);

	const rowspan = useMemo(() => {
		let max = 0;
		(function recursive(columns) {
			for (let i = 0; i < columns.length; i++) {
				max = max > columns[i].level ? max : columns[i].level;
				if (columns[i].isColumns) {
					recursive(columns[i].columns);
				}
			}
		})(columns);
		return max;
	}, [columns, columnsRef]);

	const colspan = useMemo(
		() =>
			columns.reduce((sum, column) => {
				return sum + (column.isGroup ? 0 : column.colspan);
			}, 0) || 1,
		[columns, columnsRef]
	);

	const groupKey = useMemo(() => {
		for (let i = 0; i < fields.length; i++) {
			if (fields[i].isGrouped && !fields[i].isGroup) {
				return fields[i].field;
			}
		}
		return null;
	}, [fields, columnsRef]);

	console.log(columnsRef.current);
	console.log("columns", columns);
	console.log("fields", fields);
	console.log("rowspan", rowspan);
	console.log("colspan", colspan);
	console.log("groupKey", groupKey);

	return (
		<XTablerColumsProvider value={ctx}>{children}</XTablerColumsProvider>
	);
};

XTable.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	groupAt: PropTypes.oneOf(["begin", "end"]),
	editable: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
	separate: PropTypes.bool,
	column: PropTypes.object,
	expand: PropTypes.bool,
	sortKey: PropTypes.string,
	sortDesc: PropTypes.bool,
	values: PropTypes.array,
};
