//todo add styles label over border
import PropTypes from 'prop-types';
import { forwardRef, memo, useMemo } from 'react';
import { isString } from '../../../utils/is';
import { useId } from '../../hooks/useId';
import { render } from '../../internal/render';
import { XIcon } from '../icon';
import './style.css';
import { useXInputControlContext } from './XInputControlContext';
import { XInputLabel } from './XInputLabel';

export const XInputBase = memo(
	forwardRef(function XInputBaseFn(
		{
			id,
			label,
			labelColor,
			required,
			leftSection: propsLeftSection,
			rightSection: propsRightSection,
			...other
		},
		ref,
	) {
		const ctx = useXInputControlContext();
		const uid = useId(ctx?.inputId || id);
		const leftSection = useMemo(
			() =>
				isString(propsLeftSection) ? (
					<XIcon>{propsLeftSection}</XIcon>
				) : (
					propsLeftSection
				),
			[propsLeftSection],
		);
		const rightSection = useMemo(
			() =>
				isString(propsRightSection) ? (
					<XIcon>{propsRightSection}</XIcon>
				) : (
					propsRightSection
				),
			[propsRightSection],
		);

		return (
			<div className="x-input-container">
				{propsLeftSection && (
					<span className="x-input-section">{leftSection}</span>
				)}
				<div className="x-input-underlay"></div>

				<div className="x-input-outline">
					<div className="x-input-outline-start"></div>
					<div className="x-input-outline-notch">
						<XInputLabel required={required}>{label}</XInputLabel>
					</div>
					<div className="x-input-outline-end"></div>
				</div>

				<div className="x-input-underlined"></div>

				{render(
					'input',
					{
						...other,
						id: uid,
						required,
						className: 'x-input-native',
						ref,
					},
					{ required },
				)}

				<XInputLabel
					id={ctx?.labelId}
					htmlFor={uid}
					color={labelColor}
					required={required}
				>
					{label}
				</XInputLabel>

				{propsRightSection && (
					<span className="x-input-section">{rightSection}</span>
				)}
			</div>
		);
	}),
);

XInputBase.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	label: PropTypes.string,
	labelColor: PropTypes.string,
	leftSection: PropTypes.node,
	rightSection: PropTypes.node,
	required: PropTypes.bool,
};
