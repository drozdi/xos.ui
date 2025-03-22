import classNames from "classnames";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { XIcon } from "../ui/icon";
import { isFunction, isString } from "../utils/is";
import { forwardRefWithAs, render } from "./render";

/**
 * Функция для преобразования строки в компонент Section
 *
 * @param {string | React.ReactElement} section - Секция
 * @returns {null | React.ReactElement} Преобразованная секция
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

* @type {React.ForwardRefExoticComponent}
* @param {object} props - свойства
* @param {string|Function} [props.className] - классы
* @param {string} [props.bodyClass] - классы для тела
* @param {boolean} [props.noPadding] - флаг для отключения отступов
* @param {boolean} [props.col] - флаг для вертикального расположения элементов
* @param {boolean} [props.row] - флаг для горизонтального расположения элементов
* @param {boolean} [props.noWrap] - флаг для отключения переноса элементов на новую строку
* @param {boolean} [props.dense] - флаг для плотного расположения элементов
* @param {boolean} [props.square] - флаг для квадратного расположения элементов
* @param {string} [props.size] - размер элементов
* @param {string} [props.align] - выравнивание элементов по вертикали
* @param {string} [props.justify] - выравнивание элементов по горизонтали
* @param {React.ReactNode} [props.children] - дочерние элементы
* @param {string|React.ReactElement} [props.leftSection] - левый раздел
* @param {string|React.ReactElement} [props.rightSection] - правый раздел
* @param {React.Ref} ref - ссылка
* @returns {React.ReactElement} элемент Sections
*/
export const Sections = forwardRefWithAs(function Box(
	{
		className,
		bodyClass,
		noPadding,
		col,
		row,
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
			isFunction(className) ? className({}) : className
		);
	}, [className, col, dense, square, noWrap, noPadding, size]);

	const bodyClassName = useMemo(() => {
		return classNames(
			"x-box-section",
			{
				"x-box-section--row": row,
				[`items-${align}`]: align,
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
	row: PropTypes.bool,
	noWrap: PropTypes.bool,
	dense: PropTypes.bool,
	square: PropTypes.bool,
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
	children: PropTypes.node,
	leftSection: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	rightSection: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Sections.displayName = "internal/Sections";
