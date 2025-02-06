import classNames from "classnames";
import { isString } from "../../utils/is";
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

export const Sections = forwardRefWithAs(function Box(
	{
		className,
		col,
		nowrap,
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
		className: classNames(
			"x-box",
			{
				"x-box--col": col,
				"x-box--nowrap": nowrap,
				[`x-box--${size}`]: size,
				[`align-${align}`]: align,
				[`justify-${justify}`]: justify,
			},
			className
		),
		children: (
			<>
				{leftSection && (
					<span className="x-box-section x-box-section--side">
						{sectionContent(leftSection)}
					</span>
				)}
				<span className="x-box-section">{children}</span>
				{rightSection && (
					<span className="x-box-section x-box-section--side">
						{sectionContent(rightSection)}
					</span>
				)}
			</>
		),
		ref,
	});
});
