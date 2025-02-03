import classNames from 'classnames';
import PropTypes from 'prop-types';
import { memo, useMemo } from 'react';
import './style.css';
export function XProgressBarRoot({
	children,
	className,
	type = 'bar',
	value,
	buffer,
	color,
	label,
	stripe,
	animation,
	indeterminate,
	thickness,
	reverse,
}) {
	const attrs = useMemo(() => ({
		role: 'progressbar',
		'aria-valuemin': 0,
		'aria-valuemax': 100,
		'aria-valuenow': indeterminate === true ? void 0 : value,
	}));
	const trackAttrs = useMemo(
		() => ({
			style: { width: buffer && !indeterminate ? `${buffer}%` : '' },
		}),
		[buffer, indeterminate],
	);
	const valueAttrs = useMemo(
		() => ({
			style: { width: value && !indeterminate ? `${value}%` : '' },
		}),
		[value, indeterminate],
	);

	return (
		<div
			{...attrs}
			className={classNames('x-progress-bar', className, {
				'x-progress-bar--stripe': !indeterminate && stripe,
				'x-progress-bar--animation': !indeterminate && animation,
				'x-progress-bar--indeterminate': indeterminate,
				'x-progress-bar--reverse': reverse,
				[`text-${color}`]: color,
			})}
			style={{ height: thickness }}
		>
			<div {...trackAttrs} className="x-progress-bar__track"></div>
			<div {...valueAttrs} className="x-progress-bar__value"></div>
			{!indeterminate && children && (
				<div className="x-progress-bar__label">{children}</div>
			)}
			{!indeterminate && !children && label && (
				<div className="x-progress-bar__label">{value}%</div>
			)}
		</div>
	);
}

export const XProgressBar = memo(XProgressBarRoot);

XProgressBarRoot.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	type: PropTypes.oneOf(['bar', 'circle']),
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	buffer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	thickness: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	color: PropTypes.oneOf([
		'primary',
		'secondary',
		'success',
		'negative',
		'positive',
		'info',
		'warning',
	]),
	label: PropTypes.bool,
	stripe: PropTypes.bool,
	animation: PropTypes.bool,
	indeterminate: PropTypes.bool,
	reverse: PropTypes.bool,
};
