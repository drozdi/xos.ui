//todo add styles label over border
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { forwardRef, memo, useMemo } from 'react';
import { isString } from '../../../utils/is';
import { useInput } from '../../hooks/useInput';
import { XInputBase } from './XInputBase';
import { XInputControl } from './XInputControl';
import { XInputError } from './XInputError';
import { XInputHint } from './XInputHint';
import { XInputMessages } from './XInputMessages';

import './style-select.css';
import './style.css';

export const XInputSelect = memo(
	forwardRef(function XInput(props, ref) {
		/**
		 * initialValue
		 * error
		 * disabled
		 * required
		 * rules,
		 */
		const { value, dirty, error, errors, focus, inputRef, disabled, attrs } =
			useInput(props, ref);

		const {
			children,
			className,
			dense,
			outline,
			filled,
			square,
			underlined,
			stackLabel,
			before: propsBefore,
			after: propsAfter,

			//label,
			placeholder,

			color,
			labelColor,

			lazyRules,
			hint,
			hideHint,
			hideMessage,
			errorMessage,

			...other
		} = props;

		const isError = !!errorMessage || (dirty && error);
		const errorMes = errorMessage || errors[0] || '';

		const inputProps = useMemo(() => {
			other.rightSection ||= 'mdi-unfold-more-horizontal';
			return {
				...other,
				...attrs,
				placeholder: '',
			};
		}, [other, attrs]);
		//console.log(attrs);

		const modColor = isError ? 'negative' : color;

		const before = useMemo(
			() => (isString(propsBefore) ? <XIcon>{propsBefore}</XIcon> : propsBefore),
			[propsBefore],
		);
		const after = useMemo(
			() => (isString(propsAfter) ? <XIcon>{propsAfter}</XIcon> : propsAfter),
			[propsAfter],
		);

		return (
			<XInputControl>
				<div
					className={classNames(
						'x-input',
						{
							'x-input--dense': dense,
							'x-input--square': square,
							'x-input--filled': filled,
							'x-input--outline': outline,
							'x-input--underlined': underlined,

							'x-input--stack-label': stackLabel,
							'x-input--disabled': disabled,
						},
						className,
					)}
				>
					{before && <div className="x-input-before">{before}</div>}
					<XInputBase
						{...inputProps}
						as="select"
						labelColor={labelColor || modColor}
						ref={ref}
					>
						{placeholder && (
							<option disabled selected>
								{placeholder}
							</option>
						)}
						{children}
					</XInputBase>
					{after && <div className="x-input-after">{after}</div>}
					<XInputMessages
						hideMessage={hideMessage}
						hideHint={hideHint}
						error={isError}
					>
						{hint && <XInputHint>{hint}</XInputHint>}
						{isError && <XInputError>{errorMes}</XInputError>}
					</XInputMessages>
				</div>
			</XInputControl>
		);
	}),
);

XInputSelect.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,

	dense: PropTypes.bool,
	outline: PropTypes.bool,
	field: PropTypes.bool,
	square: PropTypes.bool,
	underlined: PropTypes.bool,
	stackLabel: PropTypes.bool,

	color: PropTypes.string,
	labelColor: PropTypes.string,

	label: PropTypes.string,
	placeholder: PropTypes.string,

	rules: PropTypes.array,
	lazyRules: PropTypes.bool,

	hint: PropTypes.string,
	hideHint: PropTypes.bool,
	hideMessage: PropTypes.bool,
	errorMessage: PropTypes.string,

	before: PropTypes.node,
	after: PropTypes.node,
	leftSection: PropTypes.node,
	rightSection: PropTypes.node,
};
