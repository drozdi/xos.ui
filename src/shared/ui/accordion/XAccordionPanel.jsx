import PropTypes from 'prop-types';
import './style.css';
import { useXAccordionTabContext } from './XAccordionTabContext';
export function XAccordionPanel({ className, children, ...props }) {
	const { getPanelId, getHeaderId } = useXAccordionTabContext();
	return (
		<div
			{...props}
			id={getPanelId()}
			role="region"
			aria-labelledby={getHeaderId()}
			className="x-accordion-panel"
		>
			<div className="x-accordion-content">{children}</div>
		</div>
	);
}

XAccordionPanel.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};
