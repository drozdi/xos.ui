import PropTypes from "prop-types";
import { forwardRef, Fragment, useCallback, useEffect, useRef } from "react";
import { setRef, useWindowEvent } from "../hooks";
import { isFunction, isString } from "../utils/is";
import { render } from "./render";

const breakpoints = [
	{ key: "xl", query: "(min-width: 1280px)" },
	{ key: "lg", query: "(min-width: 1024px)" },
	{ key: "md", query: "(min-width: 768px)" },
	{ key: "sm", query: "(min-width: 640px)" },
	{ key: "xs", query: "(min-width: 384px)" },
	{ key: "base", query: "" }, // Базовое значение
];

/**
 * Функция getResponsiveValue возвращает значение, соответствующее текущему размеру экрана.
 * @param {Object} responsiveValue - Объект с значениями для разных размеров экрана.
 * @returns {*} - Значение, соответствующее текущему размеру экрана.
 */
function getResponsiveValue(responsiveValue) {
	if (!responsiveValue || typeof responsiveValue !== "object") {
		return responsiveValue;
	}

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
 * Функция variantStyles создает стили для варианта компонента.
 * @param {string} name - Имя варианта.
 * @param {Object} [vars={}] - Объект с переменными для варианта.
 * @param {Object} [props={}] - Объект с свойствами для варианта.
 * @returns {Object} - Объект со стилями для варианта.
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
 * @returns {React.ReactElement} Элемент div с заданными стилями.
 */
export const Unstyled = forwardRef(
	({ name, vars = {}, style, ...props }, outerRef) => {
		const elementRef = useRef(null);
		const styleCache = useRef({});
		const propsCache = useRef({});

		/**
		 * Генерирует CSS переменные для вариантов стилей
		 */
		const getVariantStyles = useCallback(() => {
			if (!name) return {};

			const newStyles = {};
			const currentProps = propsCache.current;

			for (const prop in currentProps) {
				if (!vars[prop] || !currentProps[prop]) continue;

				const value = getResponsiveValue(currentProps[prop]);
				const keys = Array.isArray(vars[prop])
					? vars[prop]
					: vars[prop].split(/\s+/);

				keys.forEach((key) => {
					newStyles[
						`--${name}-${key}`
					] = `var(--${name}-${key}-${value})`;
				});
				delete propsCache.current[prop];
			}

			return newStyles;
		}, [name, vars]);

		/**
		 * Обновляет стили элемента
		 */
		const updateStyles = useCallback(() => {
			if (!elementRef.current) return;

			const baseStyles = isFunction(style) ? style() : style || {};
			const variantStyles = getVariantStyles();

			const newStyles = { ...baseStyles, ...variantStyles };

			// Применяем стили только если они изменились
			if (
				JSON.stringify(newStyles) !== JSON.stringify(styleCache.current)
			) {
				Object.assign(elementRef.current.style, newStyles);
				styleCache.current = newStyles;
			}
		}, [style, getVariantStyles]);

		// Объединяем внешний и внутренний ref
		useEffect(() => {
			setRef(outerRef, elementRef.current);
		}, [outerRef]);

		// Кэшируем props для избежания лишних обновлений
		useEffect(() => {
			propsCache.current = props ?? {};
		}, [props]);

		// Первоначальное применение стилей и подписка на resize
		useEffect(() => {
			updateStyles();
		}, [updateStyles]);

		useWindowEvent("resize", updateStyles);

		console.log(propsCache, elementRef);

		return render("div", {
			as: Fragment,
			ref: elementRef,
			...propsCache.current,
			// style не передается напрямую, так как применяется через ref
		});

		/*const [computedStyle, setComputedStyle] = useState({});

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
	});*/
	}
);

// Проверка типов для пропсов
Unstyled.propTypes = {
	name: PropTypes.string,
	vars: PropTypes.object,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

// Устанавливаем displayName для удобства отладки
Unstyled.displayName = "internal/Unstyled";
