import classNames from 'classnames';
import PropTypes from 'prop-types';
import './style.css';
import { useXAccordionTabContext } from './XAccordionTabContext';
/**
* Компонент XAccordionPanel
* @param {Object} props - свойства
* @param {React.ReactNode} props.children - дочерние элементы
* @param {string} props.className - классы
* @returns {React.ReactElement} элемент XAccordionPanel
*/
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
   		<div className={classNames("x-accordion-content", className)}>{children}</div>
   	</div>
   );
}

XAccordionPanel.propTypes = {
   children: PropTypes.node,
   className: PropTypes.string,
};
;
