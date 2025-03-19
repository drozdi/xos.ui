import classNames from "classnames";
import { PropTypes } from "prop-types";
import { forwardRefWithAs, render } from "./render";

/**
 * Компонент для создания гибкой структуры с возможностью размещения элементов в колонки.
 *
 * @param {Object} props - Параметры компонента.
 * @param {string} [props.className] - Дополнительные классы CSS.
 * @param {boolean} [props.col] - Расположение элементов в колонку.
 * @param {boolean} [props.noWrap] - Запрет переноса блоков.
 * @param {string} [props.size] - Размер контейнера.
 * @param {boolean} [props.square] - Квадратные углы.
 * @param {boolean} [props.noPadding] - Отсутствие внутренних отступов.
 * @param {boolean} [props.noGap] - Отсутствие внутренних отступов между элементами.
 * @param {string} [props.align] - Выравнивание по вертикали.
 * @param {string} [props.justify] - Выравнивание по горизонтали.
 * @param {any} ref - Референс компонента.
 * @returns {JSX.Element} Элемент div с заданной структурой и стилями.
 */
export const Box = forwardRefWithAs(function Box(
	{
		className,
		col,
		noWrap,
		noGap,
		size,
		square,
		noPadding,
		align,
		justify,
		...props
	},
	ref
) {
	return render("div", {
		...props,
		className: classNames(
			"x-box",
			{
				"x-box--col": col,
				"x-box--no-wrap": noWrap,
				"x-box--square": square,
				"x-box--no-padding": noPadding,
				"x-box--no-gap": noGap,
				[`x-box--${size}`]: size,
				[`items-${align}`]: align,
				[`justify-${justify}`]: justify,
			},
			className
		),
		ref,
	});
});
Box.propTypes = {
	className: PropTypes.string,
	col: PropTypes.bool,
	noWrap: PropTypes.bool,
	noGap: PropTypes.bool,
	noPadding: PropTypes.bool,
	size: PropTypes.oneOf(["xs", "sm", "lg", "xl"]),
	align: PropTypes.oneOf([
		"start",
		"center",
		"end",
		"stretch",
		"baseline",
		"normal",
	]),
	justify: PropTypes.oneOf([
		"start",
		"center",
		"end",
		"between",
		"around",
		"evenly",
		"normal",
		"baseline",
		"stretch",
	]),
};
Box.displayName = "internal/Box";

/**
 * Компонент для создания разделов.
 *
 * @param {Object} props - Параметры компонента.
 * @param {string} [props.className] - Дополнительные классы CSS.
 * @param {boolean} [props.top] - Выравнивание по верху.
 * @param {boolean} [props.row] - Горизонтальный элемент.
 * @param {boolean} [props.side] - Боковой элемент.
 * @param {boolean} [props.noWrap] - Запрет переноса текста.
 * @param {boolean} [props.noPadding] - Отключение отступов.
 *
 * @param {any} ref - Референс компонента.
 * @returns {JSX.Element} Элемент span с заданной структурой и стилями.
 * */
Box.Section = forwardRefWithAs(function Section(
	{ className, top, side, row, noPadding, noGap, noWrap, ...props },
	ref
) {
	return render("span", {
		...props,
		className: classNames(
			"x-box-section",
			{
				"x-box-section--side": side,
				"x-box-section--row": row,
				"x-box-section--no-padding": noPadding,
				"justify-start": top,
				"text-nowrap": noWrap,
			},
			className
		),
		ref,
	});
});
Box.Section.propTypes = {
	className: PropTypes.string,
	top: PropTypes.bool,
	side: PropTypes.bool,
	row: PropTypes.bool,
	noPadding: PropTypes.bool,
	noGap: PropTypes.bool,
	noWrap: PropTypes.bool,
};
Box.Section.displayName = "internal/BoxSection";

/**
 * Компонент для создания заголовков.
 *
 * @param {Object} props - Параметры компонента.
 * @param {string} [props.className] - Дополнительные классы CSS.
 * @param {number} [props.level] - Уровень заголовка.
 * @param {boolean} [props.top] - Выравнивание по верху.
 * @param {boolean} [props.nowrap] - Запрет переноса текста.
 * @param {any} ref - Референс компонента.
 * @returns {JSX.Element} Элемент span с заданной структурой и стилями.
 * @example
 * <Box.Header>Header</Box.Header>
 * */
Box.Header = forwardRefWithAs(function Header(
	{ className, level, top, noWrap, ...props },
	ref
) {
	const tag = level ? `h${level}` : "span";
	return render(tag, {
		...props,
		className: classNames(
			"x-box-header",
			{
				"justify-start": top,
				"text-nowrap": noWrap,
			},
			className
		),
		ref,
	});
});
Box.Header.propTypes = {
	className: PropTypes.string,
	level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
	top: PropTypes.bool,
	noWrap: PropTypes.bool,
};
Box.Header.displayName = "internal/BoxHeader";

/**
 * Компонент для создания заголовков.
 *
 * @param {Object}
 * @param {string} [props.className] - Дополнительные классы CSS.
 * @returns {JSX.Element} Элемент span с заданной структурой и стилями.
 * @example
 * <Box.Title>
 * <Box.Icon>home</Box.Icon>
 * </Box.Title>
 * */
Box.Title = forwardRefWithAs(function Title({ className, ...props }, ref) {
	return render("span", {
		...props,
		className: classNames("x-box-title", className),
		ref,
	});
});
Box.Title.propTypes = {
	className: PropTypes.string,
};
Box.Title.displayName = "internal/BoxTitle";

/**
 * Компонент для создания подзаголовков.
 *
 * @param {Object} props - Параметры компонента.
 * @param {string} [props.className] - Дополнительные классы CSS.
 * @returns {JSX.Element} Элемент span с заданной структурой и стилями.
 * @example
 * <Box.Subtitle>home</Box.Subtitle>
 * */
Box.Subtitle = forwardRefWithAs(function Subtitle(
	{ className, ...props },
	ref
) {
	return render("span", {
		...props,
		className: classNames("x-box-subtitle", className),
		ref,
	});
});
Box.Subtitle.propTypes = {
	className: PropTypes.string,
};
Box.Subtitle.displayName = "internal/BoxSubtitle";
