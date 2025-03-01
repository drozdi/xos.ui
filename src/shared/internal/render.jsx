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
import { isFunction } from "../../utils/is";

/**
 * Контекст с типами по умолчанию
 * @type {React.Context}
 */
const RenderContext = createContext({
	render: ({ as, to }) => (!!to ? "a" : as),
});

/**
 * Провайдер с проверкой пропсов
 * @param {*} props - Пропсы для провайдера
 * @returns
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
 * Хук для использования контекста рендеринга
 * @returns {*} - Контекст рендеринга
 */
export function useRenderContext() {
	return useContext(RenderContext);
}

/**
 * Функция для обвертки ref и as
 * @param {*} component - Компонент, который нужно обернуть
 * @returns {*} - Обернутый компонент
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
 * Функция для применения контекста к пропсам
 * @param props - Пропсы компонента
 * @returns {*} - Пропсы с учетом контекста
 * */
function applyContextToProps(props) {
	const { render = ({ as }) => as, ...contextValues } = useRenderContext();
	return { ...contextValues, ...props, as: render(props), render: undefined };
}

/**
 * Основная функция рендеринга с улучшениями
 *
 * @param {*} tag - Тег или компонент, который нужно отрендерить
 * @param {*} props - Пропсы для компонента
 * @param {*} state - Состояние компонента
 * @returns {ReactElement} - Результат рендеринга
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
		["className", "style"].forEach((key) => {
			if (key in rest && rest[key] && isFunction(rest[key])) {
				if (Component.render) {
					result[key] = (arg) =>
						rest[key]({ ...arg, ...state }, rest);
				} else {
					result[key] = rest[key]?.(state || {}, rest);
				}
			}
		});

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
		let childProps = resolvedChildren.props;
		let childPropsClassName = childProps?.className;
		let childPropsStyle = childProps?.style;

		let newClassName = isFunction(childPropsClassName)
			? childPropsClassName(state, memoizedRest.className)
			: childPropsClassName;

		let newStyle = isFunction(childPropsStyle)
			? childPropsStyle(state, memoizedRest.style)
			: childPropsStyle;

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
