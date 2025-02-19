import classNames from "classnames";
import { PropTypes } from "prop-types";
import { isString } from "../../utils/is";
import { XIcon } from "../ui/icon";
import { forwardRefWithAs, render } from "./render";

/**
 * Компонент для создания гибкой структуры с возможностью размещения элементов в колонки.
 *
 * @param {Object} props - Параметры компонента.
 * @param {string} [props.className] - Дополнительные классы CSS.
 * @param {boolean} [props.col] - Расположение элементов в колонку.
 * @param {boolean} [props.noWrap] - Запрет переноса блоков.
 * @param {string} [props.size] - Размер контейнера.
 * @param {string} [props.align] - Выравнивание по вертикали.
 * @param {string} [props.justify] - Выравнивание по горизонтали.
 * @param {any} ref - Референс компонента.
 * @returns {JSX.Element} Элемент div с заданной структурой и стилями.
 */
export const Box = forwardRefWithAs(function Box(
	{ className, col, noWrap, size, align, justify, ...props },
	ref
) {
	return render("div", {
		...props,
		className: classNames(
			"x-box",
			{
				"x-box--col": col,
				"x-box--nowrap": noWrap,
				[`x-box--${size}`]: size,
				[`align-${align}`]: align,
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
	align: PropTypes.oneOf([
		"normal",
		"center",
		"start",
		"end",
		"between",
		"around",
		"evenly",
		"baseline",
		"stretch",
	]),
	justify: PropTypes.oneOf([
		"normal",
		"center",
		"start",
		"end",
		"between",
		"around",
		"evenly",
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
 * @param {boolean} [props.nowrap] - Запрет переноса текста.
 * @param {any} ref - Референс компонента.
 * @returns {JSX.Element} Элемент span с заданной структурой и стилями.
 */
Box.Section = forwardRefWithAs(function Section(
	{ className, top, side, nowrap, ...props },
	ref
) {
	return render("span", {
		...props,
		className: classNames(
			"x-box-section",
			{
				"x-box-section--side": side,
				"justify-start": top,
				"text-nowrap": nowrap,
			},
			className
		),
		ref,
	});
});

/**
 * Компонент для создания заголовков.
 * @param {Object} props - Параметры компонента.
 * @param {string} [props.className] - Дополнительные классы CSS.
 * @param {any} ref - Референс компонента.
 * @returns {JSX.Element} Элемент span с заданной структурой и стилями.
 * @example
 * <Box.Header>Header</Box.Header>
 */
Box.Header = forwardRefWithAs(function Header(props, ref) {
	return render("span", {
		...props,
		className: classNames("x-box-header", props.className),
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
Box.Title = forwardRefWithAs(function Title(props, ref) {
	return render("span", {
		...props,
		className: classNames("x-box-title", props.className),
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
Box.Subtitle = forwardRefWithAs(function Subtitle(props, ref) {
	return render("span", {
		...props,
		className: classNames("x-box-subtitle", props.className),
		ref,
	});
});

/**
 * Компонент для создания иконок.
 * @param {Object} props - Параметры компонента.
 * @param {string} [props.className] - Дополнительные классы CSS.
 * @returns {JSX.Element} Элемент span с заданной структурой и стилями.
 * @example
 * <Box.Icon>home</Box.Icon>
 * */
Box.Icon = forwardRefWithAs(function Icon(props, ref) {
	return render("span", {
		...props,
		className: classNames("x-box-icon", props.className),
		ref,
	});
});

/**
 * Компонент для создания заголовков.
 * @param {Object} props - Параметры компонента.
 * @param {boolean} [props.top] - Выравнивание по верху.
 * @param {boolean} [props.side] - Боковой элемент.
 * @param {boolean} [props.nowrap] - Запрет переноса текста.
 * @returns {JSX.Element} Элемент span с заданной структурой и стилями.
 * */
Box.Header = forwardRefWithAs(function Header(props, ref) {
	return render("span", {
		...props,
		className: classNames("x-box-header", props.className),
		ref,
	});
});

/**
 * Компонент для создания заголовков.
 * @param {Object} props - Параметры компонента.
 * @param {string} [props.className] - Дополнительные классы CSS.
 * @param {boolean} [props.top] - Выравнивание по верху.
 * @param {boolean} [props.side] - Боковой элемент.
 * @param {boolean} [props.nowrap] - Запрет переноса текста.
 * @param {any} ref - Референс компонента.
 * @returns {JSX.Element} Элемент span с заданной структурой и стилями.
 * */
Box.Title = forwardRefWithAs(function Title(props, ref) {
	return render("span", {
		...props,
		className: classNames("x-box-title", props.className),
		ref,
	});
});

/**
 * Компонент для создания подзаголовков.
 * @param {Object} props - Параметры компонента.
 * @param {string} [props.className] - Дополнительные классы CSS.
 * @param {boolean} [props.top] - Выравнивание по верху.
 * @param {boolean} [props.side] - Боковой элемент.
 * @param {boolean} [props.nowrap] - Запрет переноса текста.
 * @param {any} ref - Референс компонента.
 * @returns {JSX.Element} Элемент span с заданной структурой и стилями.
 * */
Box.Subtitle = forwardRefWithAs(function Subtitle(props, ref) {
	return render("span", {
		...props,
		className: classNames("x-box-subtitle", props.className),
		ref,
	});
});

Box.Icon = (icon) => {
	if (!icon) {
		return null;
	} else if (isString(icon)) {
		return <XIcon>{icon}</XIcon>;
	} else {
		return icon;
	}
};
