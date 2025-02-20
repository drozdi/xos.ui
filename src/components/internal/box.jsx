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
 * @param {string} [props.align] - Выравнивание по вертикали.
 * @param {string} [props.justify] - Выравнивание по горизонтали.
 * @param {any} ref - Референс компонента.
 * @returns {JSX.Element} Элемент div с заданной структурой и стилями.
 */
export const Box = forwardRefWithAs(function Box(
	{ className, col, noWrap, size, square, align, justify, ...props },
	ref
) {
	return render("div", {
		...props,
		className: classNames(
			"x-box",
			{
				"x-box--col": col,
				"x-box--nowrap": noWrap,
				"x-box--square": square,
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
	size: PropTypes.oneOf(["xs", "sm", "xl"]),
	align: PropTypes.oneOf(["start", "center", "end", "stretch", "baseline"]),
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

/**
 * Компонент для создания разделов.
 * @param {Object} props - Параметры компонента.
 * @param {string} [props.className] - Дополнительные классы CSS.
 * @param {boolean} [props.top] - Выравнивание по верху.
 * @param {boolean} [props.side] - Боковой элемент.
 * @param {boolean} [props.noWrap] - Запрет переноса текста.
 * @param {any} ref - Референс компонента.
 * @returns {JSX.Element} Элемент span с заданной структурой и стилями.
 * */
Box.Section = forwardRefWithAs(function Section(
	{ className, top, side, noWrap, ...props },
	ref
) {
	return render("span", {
		...props,
		className: classNames(
			"x-box-section",
			{
				"x-box-section--side": side,
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
	noWrap: PropTypes.bool,
};

/**
 * Компонент для создания заголовков.
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

/**
 * Компонент для создания заголовков.
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

/**
 * Компонент для создания подзаголовков.
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
