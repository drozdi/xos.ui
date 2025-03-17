import PropTypes from "prop-types";
import { memo } from "react";
import { XPaginationProvider } from "./XPaginationContext";
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
	};

	return (
		<XPaginationProvider value={ctx}>
			<div className="x-pagination">
				<button className="x-pagination-btn">1</button>
				<button className="x-pagination-btn">2</button>
				<button className="x-pagination-btn">3</button>
				<button className="x-pagination-btn">4</button>
				<button className="x-pagination-btn">5</button>
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
