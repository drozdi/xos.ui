import classNames from "classnames";
import { useMemo } from "react";
import { isString } from "../../utils/is";
import { XIcon } from "../ui/icon";
import { forwardRefWithAs, render } from "./render";

/**
 * Компонент для создания гибкой структуры с возможностью размещения элементов в колонки.
 *
 * @param {Object} props - Параметры компонента.
 * @param {string} [props.className] - Дополнительные классы CSS.
 * @param {boolean} [props.col] - Расположение элементов в колонку.
 * @param {boolean} [props.noWrap] - Запрет переноса текста.
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

Box.Icon = (section) => {
	return useMemo(() => {
		if (!section) {
			return null;
		}
		return isString(section) ? <XIcon>{section}</XIcon> : section;
	}, [section]);
};

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
