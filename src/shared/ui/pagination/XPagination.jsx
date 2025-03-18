import PropTypes from "prop-types";
import { memo } from "react";
import { XPaginationProvider } from "./XPaginationContext";
import { XPaginationDots } from "./XPaginationDots";
import {
	XPaginationFirst,
	XPaginationLast,
	XPaginationNext,
	XPaginationPrevious,
} from "./XPaginationEdges";
import "./style.css";

export const XPagination = memo(function XPaginationFn({
	className,
	disabled,
	edges,
	controls,
	siblings = 2,
	total,
}) {
	const ctx = {
		disabled,
		edges,
		controls,
		siblings,
		total,
		current: undefined,
		onNext: () => {},
		onPrevious: () => {},
		onFirst: () => {},
		onLast: () => {},
	};

	return (
		<XPaginationProvider value={ctx}>
			<div className="x-pagination">
				<button className="x-pagination-btn" disabled>
					1
				</button>
				<XPaginationDots />
				<button className="x-pagination-btn">6</button>
				<button className="x-pagination-btn">7</button>
				<button className="x-pagination-btn x-pagination-btn--active">
					8
				</button>
				<button className="x-pagination-btn">9</button>
				<button className="x-pagination-btn">10</button>
				<button className="x-pagination-btn">11</button>
				<button className="x-pagination-btn">12</button>
				<button className="x-pagination-btn">13</button>
				<button className="x-pagination-btn">14</button>
				<button className="x-pagination-btn">15</button>
			</div>
		</XPaginationProvider>
	);
});

XPagination.propTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool,
	edges: PropTypes.bool,
	controls: PropTypes.bool,
	siblings: PropTypes.number,
	total: PropTypes.number,

	onChange: PropTypes.func,
	onFirstPage: PropTypes.func,
	onLastPage: PropTypes.func,
	onNextPage: PropTypes.func,
	onPreviousPage: PropTypes.func,
};

XPagination.displayName = "ui/XPagination";

XPagination.Dots = XPaginationDots;
XPagination.First = XPaginationFirst;
XPagination.Last = XPaginationLast;
XPagination.Next = XPaginationNext;
XPagination.Previous = XPaginationPrevious;
