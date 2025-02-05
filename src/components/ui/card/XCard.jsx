import classNames from 'classnames';
import { PropTypes } from 'prop-types';
import { render } from '../../internal/render';
import './style.css';
import { XCardActions } from './XCardActions';
import { XCardSection } from './XCardSection';

export function XCard({ tag = 'div', className, border, flat, square, ...props }) {
	return render('div', {
		...props,
		className: classNames('x-card x-bg-surface', className, {
			'x-card--border': border,
			'x-card--flat': flat,
			'x-card--square': square,
		}),
	});
}

XCard.Actions = XCardActions;
XCard.Section = XCardSection;

XCard.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
	border: PropTypes.bool,
	flat: PropTypes.bool,
	square: PropTypes.bool,
};
