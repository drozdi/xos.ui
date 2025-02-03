import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useMemo, useRef } from 'react';
import { isFunction } from '../../../utils/is';
import { useForkRef } from '../../hooks/useForkRef';
import { forwardRefWithAs, render } from '../../internal/render';
import { XLink } from '../link';
import './style.css';
const clickableTag = ['a', 'label', 'navLink'];
const disRoleTag = ['label'];
const disDisabledTag = ['div', 'span', 'a', 'label'];

export const XItem = forwardRefWithAs(function XItemFn(
	{
		className,
		children,
		tabIndex = 0,
		vertical,
		dense,
		active,
		activeClass,
		disabled,
		role,
		onClick,
		hoverable,
		color,
		...props
	},
	ref,
) {
	const elementRef = useRef(null);
	const handleRef = useForkRef(ref, elementRef);
	const isActionable = useMemo(() => {
		return (
			props.as === XLink ||
			clickableTag.includes(
				elementRef.current?.nodeName.toLowerCase() ?? props.as,
			) ||
			isFunction(onClick)
		);
	}, [props, onClick, elementRef]);
	const isClickable = !disabled && isActionable;
	const isHoverable = isClickable || hoverable;
	const attrs = useMemo(() => {
		const attrs = {
			className: ({ isActive }) =>
				classNames(
					'x-item',
					className,
					{
						'x-item--dense': dense,
						'x-item--active': active || isActive,
						'x-item--disabled': disabled,
						'x-item--clickable': isClickable,
						'x-item--hoverable': isHoverable,
						'x-item--vertical': vertical,
						[`text-${color}`]: color,
					},
					active && !disabled ? activeClass : '',
				),
			role: disRoleTag.includes(props.as) ? undefined : (role ?? 'listitem'),
			disabled: disabled,
		};
		if (isActionable) {
			attrs['aria-disabled'] = disabled;
		}
		if (isClickable) {
			attrs.tabIndex = disabled ? -1 : (tabIndex ?? -1);
		}
		if (disDisabledTag.includes(props.as)) {
			delete attrs.disabled;
		}
		return attrs;
	}, [
		disabled,
		tabIndex,
		role,
		dense,
		active,
		className,
		activeClass,
		isClickable,
		isActionable,
	]);
	return render(
		'div',
		{
			...props,
			...attrs,
			ref: handleRef,
			children,
		},
		{
			active,
			disabled,
		},
	);
});

XItem.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	dense: PropTypes.bool,
	color: PropTypes.string,
	active: PropTypes.bool,
	disabled: PropTypes.bool,
	vertical: PropTypes.bool,
	hoverable: PropTypes.bool,
	activeClass: PropTypes.string,
	tabIndex: PropTypes.number,
	role: PropTypes.string,
	onClick: PropTypes.func,
};
