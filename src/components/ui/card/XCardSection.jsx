import classNames from 'classnames';
import { PropTypes } from 'prop-types';
import { render } from '../../internal/render';
import './style.css';

export function XCardSection({ className, horizontal, ...props }) {
	return render('div', {
		...props,
		className: classNames('x-card__section', className, {
			'x-card__section--horizontal': horizontal,
		}),
	});
}

XCardSection.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	horizontal: PropTypes.bool,
};
