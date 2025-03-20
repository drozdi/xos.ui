import PropTypes from "prop-types";
import { Fragment } from "react";
import { isFunction, isString } from "../utils/is";
import { render } from "./render";

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
		if (!vars[prop]) {
			continue;
		}
		if (!props[prop]) {
			continue;
		}
		(vars[prop] ?? []).forEach((key) => {
			style[`--${name}-${key}`] = `var(--${name}-${key}-${props[prop]})`;
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
	const computedStyle = isFunction(style)
		? (...args) => ({
				...style(...args),
				...variantStyles(name, vars, props),
		  })
		: {
				...style,
				...variantStyles(name, vars, props),
		  };
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
