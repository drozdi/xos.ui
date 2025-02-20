import {
	cloneElement,
	createContext,
	createElement,
	forwardRef,
	Fragment,
	useContext,
} from "react";
import { isFunction } from "../../utils/is";

const RenderContext = createContext({
	render: ({ as, to }) => (!!to ? "a" : as),
});

export function RenderProvider({ children, ...contextValues }) {
	return (
		<RenderContext.Provider value={contextValues}>
			{children}
		</RenderContext.Provider>
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
	return { ...contextValues, ...props, as: render(props), render: undefined };
}

export function render(tag, props, state) {
	let {
		as: Component = tag,
		children,
		if: _if,
		...rest
	} = applyContextToProps(props);

	if (_if?.(state) === false) {
		return null;
	}

	if (!Component) {
		return null;
	}

	/*const memoizedRest = useMemo(() => {
		const result = { ...(rest || {}) };
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

		console.log(result);

		return result;
	}, [Component, rest, state]);*/

	const memoizedRest = { ...(rest || {}) };
	["className", "style"].forEach((key) => {
		if (key in rest && rest[key] && isFunction(rest[key])) {
			if (Component.render) {
				memoizedRest[key] = (arg) =>
					rest[key]({ ...arg, ...state }, rest);
			} else {
				memoizedRest[key] = rest[key]?.(state || {}, rest);
			}
		}
	});

	if (
		memoizedRest["aria-labelledby"] &&
		memoizedRest["aria-labelledby"] === memoizedRest.id
	) {
		memoizedRest["aria-labelledby"] = undefined;
	}
	//*/

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
