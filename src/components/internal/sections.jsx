import classNames from "classnames";
import { isFunction, isString } from "../../utils/is";
import { XIcon } from "../ui/icon";
import { forwardRefWithAs, render } from "./render";

/**
 * Функция для преобразования строки в компонент XIcon
 *
 * @param {string | JSX.Element} section - Секция
 * @returns {JSX.Element} Преобразованная секция
 */
const sectionContent = (section) => {
	if (isString(section)) {
		return <XIcon>{section}</XIcon>;
	}
	return section;
};

/**
 * Функция для преобразования строки в компонент Section
 *
 * @param {string | JSX.Element} section - Секция
 * @returns {JSX.Element} Преобразованная секция
 */
const processSection = (section) => {
	if (!section) {
		return null;
	}
	const content = isString(section) ? <XIcon>{section}</XIcon> : section;
	return <span className="x-box-section x-box-section--side">{content}</span>;
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
		col,
		noWrap,
		dense,
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
					"x-box--no-wrap": noWrap,
					[`x-box--${size}`]: size,
				},
				isFunction(className) ? className?.(...args) : className
			),
		children: (
			<>
				{processSection(leftSection)}
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
				{processSection(rightSection)}
			</>
		),
		ref,
	});
});
