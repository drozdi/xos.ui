import PropTypes from 'prop-types';
import { XChevron } from '../icon';
import './style.css';

import classNames from 'classnames';
import { useXAccordionTabContext } from './XAccordionTabContext';
export function XAccordionHeader({ className, children, onClick, ...props }) {
	const {
		value,
		active,
		disabled,
		getHeaderId,
		getPanelId,
		onKeyDown,
		onToggleExpanded,
	} = useXAccordionTabContext();

	const handleClick = (event) => {
		if (disabled) {
			return;
		}
		event.value = value;
		onClick?.(event);
		onToggleExpanded(event);
	};
	const handleKeyDown = (event) => {
		event.value = value;
		onKeyDown(event);
	};

	return (
		<button
			{...props}
			id={getHeaderId(value)}
			className={classNames('x-accordion-control', className)}
			role="button"
			disabled={disabled}
			aria-disabled={disabled}
			aria-expanded={active}
			aria-controls={getPanelId(value)}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			<h3>{children}</h3>
			<span>
				<XChevron className="x-accordion-chevron" />
			</span>
		</button>
	);
}

XAccordionHeader.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	onClick: PropTypes.func,
};
