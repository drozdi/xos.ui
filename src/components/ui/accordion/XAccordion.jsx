import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useLayoutEffect, useMemo, useState } from 'react';
import { isArray } from '../../../utils/is';
import { useId } from '../../hooks/useId';
import { scopedKeydownHandler } from '../../internal/events/scoped-keydown-handler';
import { XAccordionProvider } from './XAccordionContext';

let iii = 0;

export function XAccordion({
	id,
	children,
	className,
	multiple,
	border,
	field,
	square,
	separated,
	onChange,
	value: propsValue,
	...props
}) {
	const uid = useId(id);
	const [current, setCurrent] = useState(
		multiple ? [].concat(propsValue) : (propsValue ?? undefined),
	);

	const handleChange = (event, value) => {
		onChange?.({
			...event,
			value,
			target: {
				...event.target,
				name: props.name,
				id: uid,
				value,
			},
			stopPropagation: () => {
				event.stopPropagation?.();
			},
			preventDefault: () => {
				event.preventDefault?.();
			},
		});
		setCurrent(() => value);
	};

	const context = useMemo(() => {
		return {
			value: current,
			isActive: (value) => {
				if (multiple && isArray(current)) {
					return current.includes(value);
				}
				return current === value;
			},
			getHeaderId: (value) => {
				return `${uid}-header-${value}`;
			},
			getPanelId: (value) => {
				return `${uid}-panel-${value}`;
			},
			getTabId: (value) => {
				return `${uid}-tab-${value}`;
			},
			onChange: (event, value) => {
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
			},
			onKeyDown: scopedKeydownHandler({
				parentSelector: '.x-accordion',
				siblingSelector: 'button, [role="button"]',
				loop: true,
				activateOnFocus: !multiple,
				orientation: 'xy',
			}),
		};
	}, [uid, current, multiple]);

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
			{...props}
			id={uid}
			className={classNames('x-accordion', className, {
				'x-accordion--border': border,
				'x-accordion--field': field,
				'x-accordion--square': square,
				'x-accordion--separated': separated,
			})}
		>
			<XAccordionProvider value={context}>{children}</XAccordionProvider>
		</div>
	);
}

XAccordion.propTypes = {
	id: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.array, PropTypes.string]),
	multiple: PropTypes.bool,
	border: PropTypes.bool,
	field: PropTypes.bool,
	square: PropTypes.bool,
	separated: PropTypes.bool,
	onChange: PropTypes.func,
};
