import PropTypes from "prop-types";
import { useCallback, useMemo, useRef } from "react";
import { useArray } from "../../hooks";
import { isArray, isEmpty, isFunction } from "../../utils/is";
import { XBtn } from "../btn";
import { XMarkupTable } from "./XMarkupTable";
import { XTablerColumsProvider } from "./XTableColumsContext";

function convertNodes(items) {
	return Object.entries(items).map(([index, item]) => {
		return {
			data: item,
			index,
			expand: false,
			isParent: false,
			isChildren: false,
			nodes: [],
		};
	});
}
function groupBy(nodes, key = false) {
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

export const XTable = ({ children, className, values = [], ...props }) => {
	props.groupAt = props.groupAt || "begin";
	const sort = useRef({
		key: props.sortKey,
		descending: props.sortDesc,
	});
	function editable(data, index) {
		return isFunction(props.editable)
			? props.editable(data, index)
			: props.editable;
	}
	const onSort = useCallback(
		(key) => {
			if (sort.current.key === key) {
				if (sort.current.descending) {
					sort.current.descending = false;
				} else {
					sort.current.key = null;
					sort.current.descending = true;
				}
			} else {
				sort.current.key = key;
				sort.current.descending = true;
			}
		},
		[sort]
	);

	const getSlot = (column, name) => {
		return column?.[name];
	};

	const [
		columnsRef,
		{
			filter: columnsFilter,
			push: columnsPush,
			findIndex: columnsFindIndex,
		},
	] = useArray();

	const context = useMemo(
		() => ({
			addColumn(column) {
				if (columnsFindIndex((v) => v.uid === column.uid) === -1) {
					columnsPush(column);
				}
			},
			delColumn(column) {
				columnsFilter((v) => v.uid !== column.uid);
			},
		}),
		[]
	);

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

	console.log("columns", columns);
	console.log("fields", fields);
	console.log("rowspan", rowspan);
	console.log("colspan", colspan);
	console.log("groupKey", groupKey);

	const genTHeadCellSlot = useCallback(
		(column, data) => column.render?.({ column, data }) || column.header,
		[]
	);
	const genTHeadCellSort = useCallback(
		(column) => (
			<XBtn
				rightSection={
					sort.current.key === column.field
						? sort.current.descending
							? "mdi-sort-descending"
							: "mdi-sort-ascending"
						: "mdi-sort"
				}
				flat
				onClick={() => onSort(column.field)}
			/>
		),
		[sort.current, onSort]
	);
	const genTHeadCellExpand = useCallback(
		(column) => (
			<XMarkupTable.Th
				key={column.uid}
				colSpan={column.colspan}
				rowSpan={column.isColumns ? 1 : rowspan - column.parentLevel}
				style={column.style}
				role="columnheader"
			></XMarkupTable.Th>
		),
		[]
	);
	const genTHeadCell = useCallback(
		(column) => {
			if (column.isGrouped) {
				return genTHeadCellExpand(column);
			}
			return (
				<XMarkupTable.Th
					key={column.uid}
					colSpan={column.colspan}
					rowSpan={
						column.isColumns ? 1 : rowspan - column.parentLevel
					}
					style={column.style}
					role="columnheader"
				>
					{genTHeadCellSlot(column)}
					{column.sortable ? genTHeadCellSort(column) : ""}
				</XMarkupTable.Th>
			);
		},
		[genTHeadCellExpand, genTHeadCellSlot, genTHeadCellSort]
	);
	const genTHead = useCallback(() => {
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
	}, [columns, genTHeadCell]);

	const nodes = useMemo(() => {
		let nodes = convertNodes(values);
		if (groupKey) {
			nodes = groupBy(nodes, groupKey);
		}
		/*if (sort.current.key) {
			nodes = sortBy(nodes, sort.current.key, sort.current.descending);
		}*/
		console.log(nodes);
		return nodes;
	}, [values, groupKey]);

	const onToggle = useCallback((node) => {
		node.expand = !node.expand;
	}, []);

	function genTBody() {
		return nodes.map((node) => {
			if (props.column?.isGrouped) {
				return genTBodyRow(node, props.expand);
			}
			return genTBodyRow(node);
		});
	}
	function genTBodyRow(node, expand = true) {
		let rows = [];
		let append = [];
		(function recursive(node, fields) {
			let row = [];
			fields.forEach((column) => {
				if (column.isGroup) {
					//append = genTBodyGroup(node, column);
					//if (!column.isGrouped) return;
				} else if (column.isGrouped && node.nodes) {
					append = genTBodyGrouped(node.nodes, node.expand);
				}
				row.push(genTBodyCell(node, column));
			});
			rows.push(
				<XMarkupTable.Tr if={() => expand} key={node.index} role="row">
					{row}
				</XMarkupTable.Tr>
			);
		})(node, fields);
		/*if (props.separate && append.length > 0) {
		  append.push(genTBodyRowSeparate(node))
		}*/
		return rows.concat(append);
	}
	function genTBodyGrouped(nodes, expand) {
		return nodes.map((node) => {
			return genTBodyRow(node, expand);
		});
	}

	function genTBodyCell(node, column) {
		if (column.isGrouped && !isEmpty(node.nodes)) {
			return genTBodyCellExpand(node, column);
		} else if (
			column.isGrouped &&
			column.isGroup &&
			node.data[column.field]
		) {
			return genTBodyCellExpand(node, column);
		} else if (column.isGrouped) {
			return <XMarkupTable.Td />;
		}
		return (
			<XMarkupTable.Td
				key={column.field}
				role="cell"
				colSpan={column.colspan}
			>
				<div className="x-table-td-title">
					{getSlot(column, "label")?.({ column, data: node.data }) ||
						column.header}
				</div>
				<div className={`x-table-td-value text-${column.align}`}>
					{(
						getSlot(
							column,
							editable(node) === true ? "editor" : "body"
						) || getSlot(column, "body")
					)?.({
						field: column.field,
						header: column.header,
						colspan: column.colspan,
						data: node.data,
					}) || node.data[column.field]}
				</div>
			</XMarkupTable.Td>
		);
	}
	function genTBodyCellExpand(node, column) {
		return (
			<XMarkupTable.Td role="cell" colSpan={column.colspan}>
				<div className={`x-table-td-value text-${column.align}`}>
					<XBtn
						round
						rightSection={`mdi-${
							node.expand ? "minus-box" : "plus-box"
						}`}
						onClick={() => onToggle(node)}
					></XBtn>
				</div>
			</XMarkupTable.Td>
		);
	}

	return (
		<XTablerColumsProvider value={context}>
			{children}
			<XMarkupTable border rowBorder colBorder>
				<XMarkupTable.Thead>{genTHead()}</XMarkupTable.Thead>
				<XMarkupTable.Tbody>{genTBody()}</XMarkupTable.Tbody>
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
