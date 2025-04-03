import classNames from "classnames";
import PropTypes from "prop-types";
import {
	cloneElement,
	createContext,
	createElement,
	forwardRef,
	Fragment,
	useContext,
	useMemo,
} from "react";
import { isFunction } from "../utils/is";

/**
 * Контекст с типами по умолчанию
 * @type {React.Context}
 */
const RenderContext = createContext({
	render: ({ as, to }) => (!!to ? "a" : as),
});

/**
 * Компонент RenderProvider
 * @param {object} props - свойства
 * @param {React.ReactNode} props.children - дочерние элементы
 * @param {object} props.contextValues - значения контекста
 * @returns {React.ReactElement} элемент RenderProvider
 */
export function RenderProvider({ children, ...contextValues }) {
	return (
		<RenderContext.Provider value={contextValues}>
			{children}
		</RenderContext.Provider>
	);
}
RenderProvider.propTypes = {
	children: PropTypes.node.isRequired,
	render: PropTypes.func, // Добавляем проверку типа для функции render
};
/**
 * Хук useRenderContext возвращает контекст рендера.
 * @returns {Object} - Контекст рендера.
 */
export function useRenderContext() {
	return useContext(RenderContext);
}

/**
 * Функция forwardRefWithAs создает компонент с привязкой ссылки и возможностью указания типа элемента.
 * @param {Function} component - Компонент, который нужно обернуть.
 * @returns {Function} - Обернутый компонент.
 */
export function forwardRefWithAs(component) {
	const ForwardedComponent = Object.assign(forwardRef(component), {
		displayName: component.displayName ?? component.name,
	});

	ForwardedComponent.propTypes = {
		as: PropTypes.elementType, // Проверка типа для as
		to: PropTypes.string, // Проверка типа для to
	};

	return ForwardedComponent;
}

/**
 * Функция applyContextToProps применяет контекст к свойствам компонента.
 * @param {Object} props - Свойства компонента.
 * @returns {Object} - Объект с объединенными свойствами контекста и компонента.
 */
function applyContextToProps(props) {
	const { render = ({ as }) => as, ...contextValues } = useRenderContext();
	return { ...contextValues, ...props, as: render(props), render: undefined };
}

/**
 * Функция render создает элемент с заданными свойствами и состоянием.
 * @param {string|Function} tag - Тег или функция для создания элемента.
 * @param {Object} props - Свойства элемента.
 * @param {Object} state - Состояние элемента.
 * @returns {React.ReactElement} - Элемент с заданными свойствами и состоянием.
 */
export function render(tag, props, state) {
	let {
		as: Component = tag,
		children,
		if: _if,
		...rest
	} = applyContextToProps(props);

	// Условный рендеринг
	if (_if?.(state) === false) {
		return null;
	}

	// Если компонент не указан, возвращаем null
	if (!Component) {
		return null;
	}

	const memoizedRest = useMemo(() => {
		const result = { ...rest };
		for (const key of ["className", "style"]) {
			if (key in rest && rest[key] && isFunction(rest[key])) {
				if (Component.render) {
					result[key] = (arg) =>
						rest[key]({ ...arg, ...state }, rest);
				} else {
					result[key] = rest[key]?.(state || {}, rest);
				}
			}
		}

		if (
			result["aria-labelledby"] &&
			result["aria-labelledby"] === result.id
		) {
			result["aria-labelledby"] = undefined;
		}

		return result;
	}, [Component, rest, state]);

	let resolvedChildren = isFunction(children) ? children(state) : children;

	if (Component === Fragment) {
		let childProps = resolvedChildren?.props ?? {};
		let childPropsClassName = childProps?.className;
		let childPropsStyle = childProps?.style;

		let newClassName = classNames(
			isFunction(childPropsClassName)
				? childPropsClassName(state, memoizedRest.className)
				: childPropsClassName,
			memoizedRest.className
		);

		let newStyle = {
			...(isFunction(childPropsStyle)
				? childPropsStyle(state, memoizedRest.style)
				: childPropsStyle),
			...memoizedRest.style,
		};

		return cloneElement(resolvedChildren, {
			...memoizedRest,
			className: newClassName,
			style: newStyle,
		});
	}

	return createElement(Component, memoizedRest, resolvedChildren);
}

render.propTypes = {
	tag: PropTypes.elementType.isRequired,
	props: PropTypes.object.isRequired,
	state: PropTypes.object,
};

render.displayName = "internal/render";
