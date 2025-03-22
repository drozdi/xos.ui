import { useMemo } from "react";
import { useUncontrolled } from "./use-uncontrolled";

/**
 * Функция range создает массив чисел в указанном диапазоне.
 * @param {number} start - Начальное значение диапазона.
 * @param {number} end - Конечное значение диапазона.
 * @returns {Array} - Массив чисел в указанном диапазоне.
 */
function range(start, end) {
	const length = end - start + 1;
	return Array.from({ length }, (_, index) => index + start);
}

/**
 * Константа DOTS используется для обозначения точек в пагинации.
 * @type {string}
 */
export const DOTS = "dots";

/**
 * Функция usePagination используется для создания пагинации.
 * @param {Object} options - Объект с параметрами.
 * @param {number} options.total - Общее количество страниц.
 * @param {number} [options.siblings=1] - Количество соседних страниц.
 * @param {number} [options.boundaries=1] - Количество страниц на границах.
 * @param {number} [options.page] - Текущая страница.
 * @param {number} [options.initial=1] - Начальная страница.
 * @param {Function} [options.onChange] - Функция, которая будет вызываться при изменении страницы.
 * @returns {Object} - Объект, содержащий диапазон страниц, текущую страницу и функции для управления страницами.
 */
export function usePagination({
	total,
	siblings = 1,
	boundaries = 1,
	page,
	initial = 1,
	onChange,
}) {
	const _total = Math.max(Math.trunc(total), 0);

	const [activePage, setActivePage] = useUncontrolled({
		value: page,
		onChange,
		defaultValue: initial,
		finalValue: initial,
	});

	const setPage = (pageNumber) => {
		if (pageNumber <= 0) {
			setActivePage(1);
		} else if (pageNumber > _total) {
			setActivePage(_total);
		} else {
			setActivePage(pageNumber);
		}
	};

	const next = () => setPage(activePage + 1);
	const previous = () => setPage(activePage - 1);
	const first = () => setPage(1);
	const last = () => setPage(_total);

	const paginationRange = useMemo(() => {
		const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;
		if (totalPageNumbers >= _total) {
			return range(1, _total);
		}

		const leftSiblingIndex = Math.max(activePage - siblings, boundaries);
		const rightSiblingIndex = Math.min(
			activePage + siblings,
			_total - boundaries
		);

		const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
		const shouldShowRightDots =
			rightSiblingIndex < _total - (boundaries + 1);

		if (!shouldShowLeftDots && shouldShowRightDots) {
			const leftItemCount = siblings * 2 + boundaries + 2;
			return [
				...range(1, leftItemCount),
				DOTS,
				...range(_total - (boundaries - 1), _total),
			];
		}

		if (shouldShowLeftDots && !shouldShowRightDots) {
			const rightItemCount = boundaries + 1 + 2 * siblings;
			return [
				...range(1, boundaries),
				DOTS,
				...range(_total - rightItemCount, _total),
			];
		}

		return [
			...range(1, boundaries),
			DOTS,
			...range(leftSiblingIndex, rightSiblingIndex),
			DOTS,
			...range(_total - boundaries + 1, _total),
		];
	}, [_total, siblings, activePage]);

	return {
		range: paginationRange,
		current: activePage,
		setPage,
		next,
		previous,
		first,
		last,
	};
}
