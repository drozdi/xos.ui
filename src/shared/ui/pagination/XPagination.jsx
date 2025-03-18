import classNames from "classnames";
import PropTypes from "prop-types";
import { memo } from "react";
import { usePagination } from "../../hooks";
import { createEventHandler } from "../../internal/events/create-event-handler";
import { XPaginationProvider } from "./XPaginationContext";
import { XPaginationDots } from "./XPaginationDots";
import {
	XPaginationFirst,
	XPaginationLast,
	XPaginationNext,
	XPaginationPrevious,
} from "./XPaginationEdges";
import { XPaginationItems } from "./XPaginationItems";
import "./style.css";

export const XPagination = memo(function XPaginationFn({
	className,
	disabled,
	edges,
	controls,
	pages,
	hideOne,
	siblings = 1,
	boundaries = 1,
	defaultValue,
	value,
	total,
	onChange,
	onNext,
	onPrevious,
	onFirst,
	onLast,
}) {
	const { range, setPage, next, previous, current, first, last } =
		usePagination({
			page: value,
			initial: defaultValue,
			onChange,
			total,
			siblings,
			boundaries,
		});

	const handleNextPage = createEventHandler(onNext, next);
	const handlePreviousPage = createEventHandler(onPrevious, previous);
	const handleFirstPage = createEventHandler(onFirst, first);
	const handleLastPage = createEventHandler(onLast, last);

	if (total <= 0 || (hideOne && total === 1)) {
		return null;
	}

	return (
		<XPaginationProvider
			value={{
				disabled,
				total,
				current,
				range,
				onChange: setPage,
				onNext: handleNextPage,
				onPrevious: handlePreviousPage,
				onFirst: handleFirstPage,
				onLast: handleLastPage,
			}}
		>
			<div className={classNames("x-pagination", className)}>
				{edges && <XPaginationFirst />}
				{controls && <XPaginationPrevious />}
				{pages && <XPaginationItems />}
				{controls && <XPaginationNext />}
				{edges && <XPaginationLast />}
			</div>
		</XPaginationProvider>
	);
});

XPagination.propTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool,

	edges: PropTypes.bool,
	controls: PropTypes.bool,
	pages: PropTypes.bool,

	hideOne: PropTypes.bool,

	siblings: PropTypes.number,
	boundaries: PropTypes.number,

	defaultValue: PropTypes.number,
	value: PropTypes.number,
	total: PropTypes.number,

	onChange: PropTypes.func,
	onFirstPage: PropTypes.func,
	onLastPage: PropTypes.func,
	onNextPage: PropTypes.func,
	onPreviousPage: PropTypes.func,
};

XPagination.displayName = "ui/XPagination";

XPagination.Dots = XPaginationDots;
XPagination.Items = XPaginationItems;
XPagination.First = XPaginationFirst;
XPagination.Last = XPaginationLast;
XPagination.Next = XPaginationNext;
XPagination.Previous = XPaginationPrevious;
