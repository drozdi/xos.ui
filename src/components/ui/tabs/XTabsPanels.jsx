import classNames from 'classnames';
import PropTypes from 'prop-types';
import './styles.css';
import { useXTabsContext } from './XTabsContext';
export function XTabsPanels({ className, children, ...props }) {
	const ctx = useXTabsContext();
	return (
		<div {...props} className={classNames('x-tabs-panels', className)}>
			{children}
		</div>
	);
}

XTabsPanels.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
};
