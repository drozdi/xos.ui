import { forwardRef, Fragment, useCallback, useEffect, useRef } from "react";
import { useWindowEvent } from "../hooks";
import { isFunction } from "../utils/is";
import { render } from "./render";

const breakpoints = [
	{ key: "xl", query: "(min-width: 1280px)" },
	{ key: "lg", query: "(min-width: 1024px)" },
	{ key: "md", query: "(min-width: 768px)" },
	{ key: "sm", query: "(min-width: 640px)" },
	{ key: "xs", query: "(min-width: 384px)" },
	{ key: "base", query: "" },
];

export const Unstyled = forwardRef(
	({ name, vars = {}, style, ...props }, outerRef) => {
		const elementRef = useRef(null);
		const styleCache = useRef({});
		const propsCache = useRef({});

		/**
		 * Получает актуальное значение для текущего размера экрана
		 */
		const getResponsiveValue = useCallback((responsiveValue) => {
			if (!responsiveValue || typeof responsiveValue !== "object") {
				return responsiveValue;
			}

			for (const { key, query } of breakpoints) {
				const value = responsiveValue[key];
				if (
					value &&
					(key === "base" || window.matchMedia(query).matches)
				) {
					return value;
				}
			}

			return responsiveValue.base;
		}, []);

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
			}

			return newStyles;
		}, [name, vars, getResponsiveValue]);

		/**
		 * Обновляет стили элемента
		 */
		const updateStyles = useCallback(() => {
			if (!elementRef.current) return;

			const baseStyles = isFunction(style) ? style() : style || {};
			const variantStyles = getVariantStyles();

			// Если не было стилей или нет вариантов стилей, просто применяем стили
			const newStyles = { ...baseStyles, ...variantStyles };

			// Применяем стили только если они изменились
			if (
				JSON.stringify(newStyles) !== JSON.stringify(styleCache.current)
			) {
				console.log(elementRef, newStyles);
				Object.keys(newStyles).forEach((key) => {
					elementRef.current.style.setProperty(key, newStyles[key]);
				});

				styleCache.current = newStyles;
			}
		}, [style, getVariantStyles]);

		// Объединяем внешний и внутренний ref
		useEffect(() => {
			if (typeof outerRef === "function") {
				outerRef(elementRef.current);
			} else if (outerRef) {
				outerRef.current = elementRef.current;
			}
		}, [outerRef]);

		// Кэшируем props для избежания лишних обновлений
		useEffect(() => {
			propsCache.current = props;
		}, [props]);

		// Первоначальное применение стилей и подписка на resize
		useEffect(() => {
			updateStyles();
		}, [updateStyles]);

		useWindowEvent("resize", updateStyles);

		return render(Fragment, {
			ref: elementRef,
			...props,
			// style не передается напрямую, так как применяется через ref
		});
	}
);

Unstyled.displayName = "Unstyled";
