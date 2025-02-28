import PropTypes from "prop-types";
import { XChevron } from "../icon";
import "./style.css";

import classNames from "classnames";
import { Sections } from "../../internal/sections";
import { useXAccordionTabContext } from "./XAccordionTabContext";
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
		<Sections
			as="button"
			rightSection={<XChevron className="x-accordion-chevron" />}
			{...props}
			id={getHeaderId(value)}
			className={classNames("x-accordion-header", className)}
			role="button"
			disabled={disabled}
			aria-disabled={disabled}
			aria-expanded={active}
			aria-controls={getPanelId(value)}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			{children}
		</Sections>
	);
}

XAccordionHeader.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	onClick: PropTypes.func,
	leftSection: PropTypes.node,
	rightSection: PropTypes.node,
};
