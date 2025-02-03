import classNames from 'classnames';
import PropTypes from 'prop-types';
import { createElement as h } from 'react';
export function XIcon({ children, className, name, color, as = 'i', ...props }) {
	name ||= children;
	if (!name) {
		return '';
	}
	color &&= color = ' text-' + color;
	color ||= '';
	return h(
		as,
		{
			...props,
			className: classNames('x-icon', name.split('-')[0], name, color, className),
			role: 'presentation',
			'aria-hidden': 'true',
		},
		'',
	);
}

XIcon.propTypes = {
	children: PropTypes.string,
	className: PropTypes.string,
	name: PropTypes.string,
	color: PropTypes.string,
	as: PropTypes.string,
};
