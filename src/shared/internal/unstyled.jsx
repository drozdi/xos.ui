import PropTypes from "prop-types";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useWindowEvent } from "../hooks";
import { isFunction, isString } from "../utils/is";
import { render } from "./render";

/**
 * Определяет значение параметра на основе текущего breakpoint.
 *
 * @param {Object} responsiveValue - Объект с responsive-значениями (например, { base: 'sm', sm: 'lg' }).
 * @returns {string} Актуальное значение параметра.
 */
function getResponsiveValue(responsiveValue) {
	if (!responsiveValue || typeof responsiveValue !== "object") {
		return responsiveValue;
	}

	const breakpoints = [
		{ key: "xl", query: "(min-width: 1280px)" },
		{ key: "lg", query: "(min-width: 1024px)" },
		{ key: "md", query: "(min-width: 768px)" },
		{ key: "sm", query: "(min-width: 640px)" },
		{ key: "xs", query: "(min-width: 384px)" },
		{ key: "base", query: "" }, // Базовое значение
	];

	for (let { key, query } of breakpoints) {
		if (
			responsiveValue[key] &&
			(key === "base" || window.matchMedia(query).matches)
		) {
			return responsiveValue[key];
		}
	}

	return responsiveValue.base; // Возвращаем базовое значение, если ничего не найдено
}

/**
 * Генерирует стили на основе вариантов.
 *
 * @param {string} name - Префикс для CSS-переменных.
 * @param {Object} vars - Объект с вариантами стилей.
 * @param {Object} props - Пропсы компонента.
 * @returns {Object} Объект стилей.
 */
function variantStyles(name, vars = {}, props = {}) {
	if (!name) {
		return {};
	}

	for (let key in vars) {
		vars[key] = isString(vars[key]) ? vars[key].split(/\s+/) : vars[key];
	}

	const style = {};

	for (let prop in props) {
		if (!vars[prop] || !props[prop]) {
			continue;
		}
		const value = getResponsiveValue(props[prop]);
		const keys = isString(vars[prop])
			? vars[prop].split(/\s+/)
			: vars[prop];

		keys.forEach((key) => {
			style[`--${name}-${key}`] = `var(--${name}-${key}-${value})`;
		});
		delete props[prop];
	}

	return style;
}

/**
 * Базовый компонент для создания стилизованных элементов.
 *
 * @param {Object} props - Параметры компонента.
 * @param {string} [props.name] - Префикс для CSS-переменных.
 * @param {Object} [props.vars] - Варианты стилей.
 * @param {Object|Function} [props.style] - Стили или функция для генерации стилей.
 * @param {any} ref - Референс компонента.
 * @returns {JSX.Element} Элемент div с заданными стилями.
 */
export function Unstyled({ name, vars = {}, style, ...props }) {
	const [computedStyle, setComputedStyle] = useState({});

	const updateStyles = useCallback(() => {
		const newStyles = isFunction(style)
			? {
					...style(),
					...variantStyles(name, vars, props),
			  }
			: {
					...style,
					...variantStyles(name, vars, props),
			  };
		setComputedStyle(newStyles);
	}, [name, vars, style, props]);
	useEffect(() => {
		updateStyles();
	}, []);
	useWindowEvent("resize", updateStyles);

	return render("div", {
		as: Fragment,
		...props,
		style: computedStyle,
	});
}

// Проверка типов для пропсов
Unstyled.propTypes = {
	name: PropTypes.string,
	vars: PropTypes.object,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

// Устанавливаем displayName для удобства отладки
Unstyled.displayName = "internal/Unstyled";
