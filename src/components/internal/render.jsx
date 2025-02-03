import {
	cloneElement,
	createContext,
	createElement,
	forwardRef,
	Fragment,
	useContext,
	useMemo,
} from 'react';
import { isFunction } from '../../utils/is';

const RenderContext = createContext({
	render: ({ as }) => (as === 'navLink' ? 'a' : as),
});

export function RenderProvider({ children, ...contextValues }) {
	return (
		<RenderContext.Provider value={contextValues}>{children}</RenderContext.Provider>
	);
}

export function useRenderContext() {
	return useContext(RenderContext);
}

export function forwardRefWithAs(component) {
	return Object.assign(forwardRef(component), {
		displayName: component.displayName ?? component.name,
	});
}

function applyContextToProps(props) {
	const { render = ({ as }) => as, ...contextValues } = useRenderContext();
	return { ...contextValues, ...props, as: render(props) };
}

function _cc(fn, ...args) {}

export function render(tag, props, state) {
	let { as: Component = tag, children, ...rest } = applyContextToProps(props);

	if (rest?.if?.(state) === false) {
		return null;
	}

	if (!Component) {
		return null;
	}

	const memoizedRest = useMemo(() => {
		const result = { ...rest };
		['className', 'style'].forEach((key) => {
			if (key in rest && rest[key] && isFunction(rest[key])) {
				if (Component.render) {
					result[key] = (arg) => rest[key]({ ...arg, ...state }, rest);
				} else {
					result[key] = rest[key](state, rest);
				}
			}
		});

		if (result['aria-labelledby'] && result['aria-labelledby'] === result.id) {
			result['aria-labelledby'] = undefined;
		}

		return result;
	}, [rest, state]);

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
