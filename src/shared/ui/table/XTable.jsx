import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { useMemoObject } from "../../hooks";
import { isArray } from "../../utils/is";
import { XBtn } from "../btn";
import { XMarkupTable } from "./XMarkupTable";
import { XTablerColumsProvider } from "./XTableColumsContext";

function groupBy(items, key = false) {
	let nodes = Object.entries(items).map(([index, item]) => {
		return useMemoObject({
			data: item,
			index,
			expand: false,
			isParent: false,
			isChildren: false,
			nodes: [],
		});
	});
	if (!key) {
		return nodes;
	}
	const result = {};
	nodes.forEach((node) => {
		if (node.data[key]) {
			if (!result[node.data[key]]) {
				result[node.data[key]] = [];
			}
			result[node.data[key]].push(node);
		} else {
			result[node.index] = node;
		}
	});
	return Object.values(result).map((val) => {
		if (isArray(val)) {
			val[0].nodes = val.slice(1).map((node) => {
				node.isChildren = true;
				return node;
			});
			val[0].isParent = !!val[0].nodes.length;
			return val[0];
		}
		return val;
	});
}
function sortBy(nodes, key, descending) {
	let result = [...nodes];
	const fn = (a, b) => {
		a = a.data;
		b = b.data;
		if (a[key] > b[key]) {
			return descending ? -1 : 1;
		}
		if (a[key] < b[key]) {
			return descending ? 1 : -1;
		}
		return 0;
	};
	result.sort(fn);
	return result.map((val) => {
		isArray(val.nodes) && val.nodes.sort(fn);
		return val;
	});
}

export const XTable = ({ children, className, ...props }) => {
	props.groupAt = props.groupAt || "begin";
	const sort = {
		key: props.sortKey,
		descending: props.sortDesc,
	};

	const [columnsRef, setColumnsRef] = useState([]);
	const context = useMemo(
		() => ({
			get columns() {
				return [...columnsRef];
			},
			set columns(columns) {
				setColumnsRef([...columns]);
			},
			level: 0,
			isHeader: true,
		}),
		[columnsRef]
	);

	const onSort = () => {};

	const columns = useMemo(
		() =>
			[...columnsRef].sort((a, b) => {
				if (a.isGrouped) {
					return props.groupAt === "begin" ? -1 : 1;
				}
				if (b.isGrouped) {
					return props.groupAt === "begin" ? 1 : -1;
				}
				return 0;
			}),
		[columnsRef, props.groupAt]
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
	}, [columns, props.column]);

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
	}, [columns]);

	const colspan = useMemo(
		() =>
			columns.reduce((sum, column) => {
				return sum + (column.isGroup ? 0 : column.colspan);
			}, 0) || 1,
		[columns]
	);

	const groupKey = useMemo(() => {
		for (let i = 0; i < fields.length; i++) {
			if (fields[i].isGrouped && !fields[i].isGroup) {
				return fields[i].field;
			}
		}
		return null;
	}, [fields]);

	console.log(columnsRef);
	console.log("columns", columns);
	console.log("fields", fields);
	console.log("rowspan", rowspan);
	console.log("colspan", colspan);
	console.log("groupKey", groupKey);

	function genTHead() {
		let rows = [];
		(function recursive(columns, level) {
			rows[level] = (rows[level] || []).concat(
				columns
					.map((column) => {
						if (column.isColumns && column.isHeader) {
							recursive(column.columns, level + 1);
						} else if (column.isColumns) {
							return column.columns.map(genTHeadCell);
						}
						if (column.isGrouped) {
							return genTHeadCell(column);
						}
						if (column.isHeader && !column.isGroup) {
							return genTHeadCell(column);
						}
						return null;
					})
					.filter((cell) => cell)
			);
		})(columns, 0);
		return rows.map((row, index) => (
			<XMarkupTable.Tr key={index} role="row">
				{row}
			</XMarkupTable.Tr>
		));
	}

	function genTHeadCell(column) {
		if (column.isGrouped) {
			return genTHeadCellExpand(column);
		}
		return (
			<XMarkupTable.Th
				colspan={column.colspan}
				rowspan={column.isParentHeader ? 1 : rowspan}
				style={column.style}
				role="columnheader"
			>
				{genTHeadCellSlot(column)}
				{column.sortable ? genTHeadCellSort(column) : ""}
			</XMarkupTable.Th>
		);
	}
	function genTHeadCellSlot(column) {
		return column.render?.({ column }) || column.header;
	}
	function genTHeadCellSort(column) {
		return (
			<XBtn
				rightSection={
					sort.value.key === column.field
						? sort.value.descending
							? "mdi-sort-descending"
							: "mdi-sort-ascending"
						: "mdi-sort"
				}
				flat
				onClick={() => onSort(column.field)}
			/>
		);
	}
	function genTHeadCellExpand(column) {
		return (
			<XMarkupTable.Th
				colspan={column.colspan}
				rowspan={column.isParentHeader ? 1 : rowspan}
				style={column.style}
				role="columnheader"
			></XMarkupTable.Th>
		);
	}

	return (
		<XTablerColumsProvider value={context}>
			{children}
			<XMarkupTable>
				<XMarkupTable.Thead>{genTHead()}</XMarkupTable.Thead>
			</XMarkupTable>
		</XTablerColumsProvider>
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
