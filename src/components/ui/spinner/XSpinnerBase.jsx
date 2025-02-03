import classNames from 'classnames';
import PropTypes from 'prop-types';
import './style.css';

export function XSpinnerBase({
	children,
	className,
	size = '1em',
	color,
	viewBox = '0 0 100 100',
	...props
}) {
	return (
		<svg
			className={classNames(
				'x-spinner',
				{
					[`text-${color}`]: color,
				},
				className,
			)}
			width={size}
			height={size}
			viewBox={viewBox}
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			{children}
		</svg>
	);
}

XSpinnerBase.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
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
	size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	viewBox: PropTypes.string,
};
