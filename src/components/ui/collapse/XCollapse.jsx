import classNames from 'classnames';
import PropTypes from 'prop-types';
import { forwardRefWithAs } from '../../internal/render';
import './style.css';
export const XCollapse = forwardRefWithAs(function CollapseFN(
	{ className, children, active, ...props },
	ref,
) {
	return (
		<div
			className={classNames(
				'x-collapse',
				{
					'x-collapse--active': active,
				},
				className,
			)}
		>
			<div className="x-accordion-panel">
				<div className="x-collapse-content" ref={ref}>
					{children}
				</div>
			</div>
		</div>
	);
});

XCollapse.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	active: PropTypes.bool,
};
