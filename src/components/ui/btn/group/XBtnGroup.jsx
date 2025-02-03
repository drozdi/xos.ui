import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { forwardRefWithAs } from '../../../internal/render';
import './style.css';
import { XBtnGroupProvider } from './XBtnGroupContext';

import { isArray } from '../../../../utils/is';

import { scopedKeydownHandler } from '../../../internal/events/scoped-keydown-handler';

import { useForkRef } from '../../../hooks/useForkRef';

export const XBtnGroup = forwardRefWithAs(function XBtnGroupFn(
	{
		children,
		className,
		selectable,
		switchable,
		multiple,
		vertical,
		separator,
		onClick,
		onChange,
		value: propsValue,
		align,
		grow,
		pills,
		name,
		disabled,
		...props
	},
	ref,
) {
	const elementRef = useRef();
	const handleRef = useForkRef(elementRef, ref);

	const [current, setCurrent] = useState(
		multiple ? [].concat(propsValue) : (propsValue ?? undefined),
	);

	const eventValue = (event, value) => ({
		...event,
		value: value,
		target: {
			...event.target,
			name: props.name,
			id: props.id,
			value: value,
		},
		stopPropagation: () => {
			event.stopPropagation?.();
		},
		preventDefault: () => {
			event.preventDefault?.();
		},
	});

	const handleChange = (event, value) => {
		onChange?.(eventValue(event, value));
		setCurrent(() => value);
	};

	const handleClick = (event, value) => {
		if (disabled) {
			return;
		}

		onClick?.(eventValue(event, value));

		if (switchable) {
			handleChange(event, value);
			return;
		}
		if (!selectable) {
			return;
		}

		let newValue;
		if (multiple) {
			newValue = [].concat(current);
			if (!newValue.includes(value)) {
				newValue.push(value);
			} else {
				newValue = newValue.filter((v) => v !== value);
			}
		} else {
			newValue = current === value ? undefined : value;
		}

		handleChange(event, newValue);
	};

	const context = useMemo(
		() => ({
			getElement: () => elementRef.current,
			btnProps: {
				...props,
				onKeyDown: scopedKeydownHandler({
					parentSelector: '[role="group"]',
					siblingSelector: '[role="button"], button',
					loop: true,
					activateOnFocus: false,
					orientation: 'xy',
				}),
			},
			switchable,
			selectable,
			multiple,
			value: propsValue,
			onChange: handleClick,
			isDisabled: (value) => {
				return disabled;
			},
			isActive: (value) => {
				if (switchable) {
					return current === value;
				}
				if (!selectable) {
					return false;
				}
				if (multiple && isArray(current)) {
					return current.includes(value);
				}
				return current === value;
			},
		}),
		[current, switchable, selectable, multiple, disabled, props, elementRef],
	);

	useLayoutEffect(() => {
		let newValue;
		if (isArray(current) && !multiple) {
			newValue = current[0] ?? undefined;
		} else if (!isArray(current) && multiple) {
			newValue = current ? [current] : [];
		} else {
			newValue = multiple ? [] : undefined;
		}
		handleChange({}, newValue);
	}, [multiple]);
	useLayoutEffect(() => {
		setCurrent(() => (multiple ? [].concat(propsValue) : (propsValue ?? undefined)));
	}, [propsValue]);

	return (
		<div
			className={classNames('x-btn-group', className, {
				'x-btn-group--vertical': vertical,
				'x-btn-group--separator': separator,
				'x-btn-group--grow': grow,
				'x-btn-group--pills': pills,
				'x-btn-group--round': props.round,
				[`justify-` + align]: !vertical && align,
				[`items-` + align]: vertical && align,
			})}
			role="group"
			ref={handleRef}
		>
			<XBtnGroupProvider value={context}>{children}</XBtnGroupProvider>
		</div>
	);
});

XBtnGroup.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	vertical: PropTypes.bool,
	selectable: PropTypes.bool,
	switchable: PropTypes.bool,
	multiple: PropTypes.bool,
	separator: PropTypes.bool,
	grow: PropTypes.bool,
	onClick: PropTypes.func,
	onChange: PropTypes.func,
	value: PropTypes.any,
	name: PropTypes.string,
	align: PropTypes.oneOf(['start', 'center', 'between', 'end']),
};
