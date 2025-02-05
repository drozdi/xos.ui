import classNames from 'classnames';
import PropTypes from 'prop-types';
import './styles.css';
import { useXTabsContext } from './XTabsContext';
export function XTabsList({ className, children, justify, grow, noWrap }) {
	const ctx = useXTabsContext();
	return (
		<div
			role="tablist"
			className={classNames(
				'x-tabs-list',
				{
					'x-tabs-list--no-wrap': noWrap,
					'x-tabs-list--grow': grow,
					[`justify-${justify}`]: justify,
				},
				className,
			)}
		>
			{children}
		</div>
	);
}

XTabsList.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	justify: PropTypes.oneOf(['start', 'center', 'between', 'end']),
	grow: PropTypes.bool,
	noWrap: PropTypes.bool,
};
