import PropTypes from "prop-types";
import { useMemo } from "react";
import { XChevron, XIcon } from "../icon";
import "./style.css";

import { isString } from "../../../utils/is";

import classNames from "classnames";
import { useXAccordionTabContext } from "./XAccordionTabContext";
export function XAccordionHeader({
	className,
	children,
	leftSection: propsLeftSection,
	rightSection: propsRightSection,
	onClick,
	...props
}) {
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

	const leftSection = useMemo(
		() =>
			isString(propsLeftSection) ? (
				<XIcon>{propsLeftSection}</XIcon>
			) : (
				propsLeftSection
			),
		[propsLeftSection]
	);
	const rightSection = useMemo(
		() =>
			isString(propsRightSection) ? (
				<XIcon>{propsRightSection}</XIcon>
			) : (
				propsRightSection
			),
		[propsRightSection]
	);

	return (
		<button
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
			{propsLeftSection && (
				<span className="x-accordion-section">{leftSection}</span>
			)}
			<h3 className="x-accordion-header-body">{children}</h3>
			<span className="x-accordion-section">
				{rightSection ? (
					rightSection
				) : (
					<XChevron className="x-accordion-chevron" />
				)}
			</span>
		</button>
	);
}

XAccordionHeader.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	onClick: PropTypes.func,
	leftSection: PropTypes.node,
	rightSection: PropTypes.node,
};
