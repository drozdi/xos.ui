import classNames from 'classnames';
import PropTypes from 'prop-types';
import './style.css';

export function XInputLabel({ className, children, htmlFor, color, required, ...props }) {
	if (!children) {
		return null;
	}
	return (
		<label
			{...props}
			htmlFor={htmlFor}
			className={classNames(
				'x-input-label',
				color ? 'text-' + color : '',
				className,
			)}
		>
			{children}
			{required && (
				<span className="text-negative" aria-hidden>
					{' *'}
				</span>
			)}
		</label>
	);
}

XInputLabel.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,

	htmlFor: PropTypes.string,
	color: PropTypes.string,

	required: PropTypes.bool,
};
