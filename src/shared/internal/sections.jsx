import classNames from "classnames";
import { useMemo } from "react";
import { isFunction, isString } from "../../utils/is";
import { XIcon } from "../ui/icon";
import { forwardRefWithAs, render } from "./render";

/**
 * Функция для преобразования строки в компонент Section
 *
 * @param {string | JSX.Element} section - Секция
 * @returns {null | JSX.Element} Преобразованная секция
 */
const processSection = (section) => {
	return useMemo(() => {
		if (!section) {
			return null;
		}
		return (
			<span className="x-box-section x-box-section--side">
				{isString(section) ? <XIcon>{section}</XIcon> : section}
			</span>
		);
	}, [section]);
};

/**
 * Компонент для создания гибкой структуры с возможностью размещения элементов в колонки.
 *
 * @param {Object} props - Параметры компонента.
 * @param {string | Function} props.className - Классы для компонента.
 * @param {string | Function} props.bodyClass - Классы для тела компонента.
 * @param {boolean} props.noPadding - Флаг, указывающий на отсутствие внутренних отступов.
 * @param {boolean} props.col - Флаг, указывающий на отображение компонента в виде колонки.
 * @param {boolean} props.noWrap - Флаг, указывающий на отсутствие обертки для элементов.
 * @param {boolean} props.dense - Флаг, указывающий на плотное расположение элементов.
 * @param {boolean} props.square - Флаг, указывающий на квадратную форму компонента.
 * @param {string} props.size - Размер компонента.
 * @param {string} props.align - Выравнивание элементов внутри компонента.
 * @param {string} props.justify - Выравнивание элементов по горизонтали внутри компонента.
 * @param {any} props.leftSection - Левая секция компонента.
 * @param {any} props.rightSection - Правая секция компонента.
 * @param {any} props.children - Дочерние элементы компонента.
 * @param {any} props.as - HTML-элемент, который будет использоваться для отображения компонента.
 * @param {any} props.leftSection - Левая секция компонента.
 * @param {any} props.rightSection - Правая секция компонента.
 * @param {any} ref - Референс компонента.
 * @returns {JSX.Element} Элемент div с заданной структурой и стилями.
 */
export const Sections = forwardRefWithAs(function Box(
	{
		className,
		bodyClass,
		noPadding,
		col,
		noWrap,
		dense,
		square,
		size,
		align,
		justify,
		children,
		leftSection,
		rightSection,
		...props
	},
	ref
) {
	const rootClassName = useMemo(() => {
		return classNames(
			"x-box",
			{
				"x-box--col": col,
				"x-box--dense": dense,
				"x-box--square": square,
				"x-box--no-wrap": noWrap,
				"x-box--no-padding": noPadding,
				[`x-box--${size}`]: size,
			},
			isFunction(className) ? className() : className
		);
	}, [className, col, dense, square, noWrap, noPadding, size]);

	const bodyClassName = useMemo(() => {
		return classNames(
			"x-box-section",
			{
				[`align-${align}`]: align,
				[`justify-${justify}`]: justify,
			},
			bodyClass
		);
	}, [align, justify, bodyClass]);

	return render("div", {
		...props,
		className: rootClassName,
		children: (
			<>
				{processSection(leftSection)}
				{children && <span className={bodyClassName}>{children}</span>}
				{processSection(rightSection)}
			</>
		),
		ref,
	});
});
Sections.propTypes = {
	className: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	bodyClass: PropTypes.string,
	noPadding: PropTypes.bool,
	col: PropTypes.bool,
	noWrap: PropTypes.bool,
	dense: PropTypes.bool,
	square: PropTypes.bool,
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
	children: PropTypes.node,
	leftSection: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	rightSection: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};
