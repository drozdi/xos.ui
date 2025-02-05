import classNames from 'classnames';
import PropTypes from 'prop-types';
import './style.css';
export function XCardActions({ children, className, horizontal, align }) {
	return (
		<div
			className={classNames('x-card__actions', className, {
				'x-card__actions--horizontal': horizontal,
				[`justify-` + align]: horizontal && align,
				[`items-` + align]: !horizontal && align,
			})}
		>
			{children}
		</div>
	);
}

XCardActions.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	horizontal: PropTypes.bool,
	align: PropTypes.oneOf(['start', 'center', 'end']),
};
