import PropTypes from "prop-types";
import {
	forwardRef,
	Fragment,
	useCallback,
	useEffect,
	useMemo,
	useRef,
} from "react";
import { setRef, useWindowEvent } from "../hooks";
import { isArray, isFunction, isNumber } from "../utils/is";
import { render } from "./render";

const BREAKPOINTS = Object.freeze([
	{ key: "xl", query: "(min-width: 1280px)" },
	{ key: "lg", query: "(min-width: 1024px)" },
	{ key: "md", query: "(min-width: 768px)" },
	{ key: "sm", query: "(min-width: 640px)" },
	{ key: "xs", query: "(min-width: 384px)" },
	{ key: "base", query: "" },
]);
/**
 * Получает актуальное значение для текущего размера экрана
 */
const getResponsiveValue = (responsiveValue) => {
	if (!responsiveValue || typeof responsiveValue !== "object") {
		return responsiveValue;
	}

	for (const { key, query } of BREAKPOINTS) {
		const value = responsiveValue[key];
		if (value && (key === "base" || window.matchMedia(query).matches)) {
			return value;
		}
	}

	return responsiveValue.base;
};

let ii = 0;

export const Unstyled = forwardRef(
	({ name, vars = {}, style, ...props }, outerRef) => {
		console.log(ii++);
		const elementRef = useRef(null);
		const styleCache = useRef({});
		const propsCache = useRef({});
		const varsKeys = useMemo(() => Object.keys(vars), [vars]);

		/**
		 * Генерирует CSS переменные для вариантов стилей
		 */
		const getVariantStyles = useCallback(() => {
			if (!name) return {};

			const newStyles = {};
			const currentProps = propsCache.current;

			for (const prop of varsKeys) {
				if (!vars[prop] || !currentProps[prop]) continue;

				const value = getResponsiveValue(currentProps[prop]);
				const keys = isArray(vars[prop])
					? vars[prop]
					: vars[prop].split(/\s+/);

				for (const key of keys) {
					newStyles[
						`--${name}-${key}`
					] = `var(--${name}-${key}-${value})`;
				}
				delete propsCache.current[prop];
			}

			return newStyles;
		}, [name, vars, propsCache.current]);

		/**
		 * Обновляет стили элемента
		 */
		const updateStyles = useCallback(() => {
			const element = elementRef.current;
			if (!element) return;

			const baseStyles = isFunction(style) ? style() : style || {};

			const variantStyles = getVariantStyles();
			const newStyles = { ...baseStyles, ...variantStyles };
			const currentStyles = styleCache.current;

			// Оптимизированное применение стилей
			let hasChanges = false;
			console.log(newStyles);
			// Проверка изменений и новых свойств
			for (const key in newStyles) {
				if (newStyles[key] !== currentStyles[key]) {
					element.style.setProperty(
						key,
						isNumber(newStyles[key])
							? newStyles[key] + "px"
							: newStyles[key]
					);
					hasChanges = true;
				}
			}

			// Проверка удаленных свойств
			for (const key in currentStyles) {
				if (!(key in newStyles)) {
					element.style.removeProperty(key);
					hasChanges = true;
				}
			}

			if (hasChanges) {
				styleCache.current = newStyles;
			}
		}, [style, getVariantStyles]);

		// Объединяем внешний и внутренний ref
		useEffect(() => {
			setRef(outerRef, elementRef.current);
			return () => setRef(outerRef, null);
		}, [outerRef]);

		// Кэшируем props для избежания лишних обновлений
		useEffect(() => {
			propsCache.current = props;
		}, [props]);

		// Первоначальное применение стилей и подписка на resize
		useEffect(() => {
			updateStyles();
			return () => {
				// Очистка при размонтировании
				if (elementRef.current) {
					for (const key in styleCache.current) {
						elementRef.current.style.removeProperty(key);
					}
				}
			};
		}, [updateStyles]);

		useWindowEvent("resize", updateStyles);

		const filteredProps = useMemo(() => {
			const result = { ...props };
			// Удаляем свойства, которые используются для генерации стилей
			for (const key of varsKeys) {
				delete result[key];
			}
			return result;
		}, [props, varsKeys]);

		return render(Fragment, {
			ref: elementRef,
			...filteredProps,
			// style не передается напрямую, так как применяется через ref
		});
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
