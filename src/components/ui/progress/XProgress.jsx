import classNames from 'classnames';
import PropTypes from 'prop-types';
import { memo, useMemo } from 'react';
import './style.css';
export function XProgressRoot({
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
	size,
	thickness,
	reverse,
}) {
	const attrs = {
		role: 'progressbar',
		'aria-valuemin': 0,
		'aria-valuemax': 100,
		'aria-valuenow': indeterminate === true ? void 0 : value,
	};
	const normalizedValue = useMemo(
		() => Math.max(0, Math.min(100, parseFloat(value))),
		[value],
	);
	const normalizedBuffer = useMemo(
		() => Math.max(0, Math.min(100, parseFloat(buffer))),
		[buffer],
	);
	const valueAttrs = useMemo(
		() => ({
			style: { width: value && !indeterminate ? `${normalizedValue}%` : '' },
		}),
		[value, indeterminate],
	);
	const trackAttrs = useMemo(
		() => ({
			style: { width: buffer && !indeterminate ? `${normalizedBuffer}%` : '' },
		}),
		[buffer, indeterminate],
	);

	const progressBar = () => (
		<div
			{...attrs}
			className={classNames('x-progress-bar', className, {
				'x-progress-bar--stripe': !indeterminate && stripe,
				'x-progress-bar--animation': !indeterminate && animation,
				'x-progress-bar--indeterminate': indeterminate,
				'x-progress-bar--reverse': reverse,
				[`text-${color}`]: color,
			})}
			style={{
				height: 1 * thickness,
			}}
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

	const radius = useMemo(() => size / 2 - thickness / 2, [size, thickness]);
	const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);

	const strokeDashOffsetBuffer = useMemo(
		() => ((100 - normalizedBuffer) / 100) * circumference,
		[normalizedBuffer, circumference],
	);
	const strokeDashOffset = useMemo(
		() => ((100 - normalizedValue) / 100) * circumference,
		[normalizedValue, circumference],
	);

	const diameter = useMemo(
		() => (radius / (1 - thickness / size)) * 2,
		[thickness, size, radius],
	);
	const strokeWidth = useMemo(
		() => (thickness / size) * diameter,
		[thickness, size, diameter],
	);

	const progressCircle = () => (
		<div
			{...attrs}
			style={{
				width: diameter,
				height: diameter,
			}}
			className={classNames('x-progress-circular', className, {
				'x-progress-circular--indeterminate': indeterminate,
				'x-progress-circular--reverse': reverse,
				[`text-${color}`]: color,
			})}
		>
			<svg
				style={{
					transform: `rotate(-90deg)`,
				}}
				xmlns="http://www.w3.org/2000/svg"
				viewBox={`0 0 ${diameter} ${diameter}`}
			>
				<defs>
					<linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor="rgb(var(--x-color-primary))" />
						<stop offset="25%" stopColor="rgb(var(--x-color-accent))" />
						<stop offset="50%" stopColor="rgb(var(--x-color-info))" />
						<stop offset="75%" stopColor="rgb(var(--x-color-positive))" />
						<stop offset="100%" stopColor="rgb(var(--x-color-secondary))" />
					</linearGradient>
				</defs>
				<circle
					className="x-progress-circular__underlay"
					fill="transparent"
					cx="50%"
					cy="50%"
					r={radius}
					strokeWidth={strokeWidth}
					strokeDasharray={circumference}
					strokeDashoffset={
						(reverse ? '-' : '') +
						(!indeterminate ? strokeDashOffsetBuffer : 0)
					}
				/>

				<circle
					className={classNames('x-progress-circular__overlay')}
					fill="transparent"
					cx="50%"
					cy="50%"
					r={radius}
					strokeWidth={strokeWidth}
					strokeDasharray={circumference}
					strokeDashoffset={(reverse ? '-' : '') + strokeDashOffset}
				/>
			</svg>
			{children && <div className="x-progress-circular__label">{children}</div>}
			{!indeterminate && !children && label && (
				<div className="x-progress-circular__label">{value}%</div>
			)}
		</div>
	);

	return type === 'bar' ? progressBar() : progressCircle();
}

export const XProgress = memo(XProgressRoot);

XProgressRoot.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	type: PropTypes.oneOf(['bar', 'circle']),
	value: PropTypes.number,
	buffer: PropTypes.number,
	size: PropTypes.number,
	thickness: PropTypes.number,
	color: PropTypes.any,
	/*color: PropTypes.oneOf([
		'primary',
		'secondary',
		'success',
		'negative',
		'positive',
		'info',
		'warning',
	]),*/
	label: PropTypes.bool,
	stripe: PropTypes.bool,
	animation: PropTypes.bool,
	indeterminate: PropTypes.bool,
	reverse: PropTypes.bool,
};
