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
	return render("div", {
		...props,
		className: (...args) =>
			classNames(
				"x-box",
				{
					"x-box--col": col,
					"x-box--dense": dense,
					"x-box--square": square,
					"x-box--no-wrap": noWrap,
					"x-box--no-padding": noPadding,
					[`x-box--${size}`]: size,
				},
				isFunction(className) ? className?.(...args) : className
			),
		children: (
			<>
				{processSection(leftSection)}
				{children && (
					<span
						className={classNames(
							"x-box-section",
							{
								[`align-${align}`]: align,
								[`justify-${justify}`]: justify,
							},
							bodyClass
						)}
					>
						{children}
					</span>
				)}
				{processSection(rightSection)}
			</>
		),
		ref,
	});
});
