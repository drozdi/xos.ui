import classNames from "classnames";
import PropTypes from "prop-types";
import { useState } from "react";
import { forwardRefWithAs } from "../../internal/render";
import { XCollapse } from "../collapse";
import { XChevron, XIcon } from "../icon";
import "./style.css";
import { XItem } from "./XItem";
import { XItemLabel } from "./XItemLabel";
import { XItemSection } from "./XItemSection";

export const XItemExpansion = forwardRefWithAs(function XItemExpansionFn(
	{
		className,
		children,
		tabIndex = 0,
		vertical,
		dense,
		active,
		activeClass,
		disabled,
		role,
		onClick,
		hoverable,
		color,
		icon,
		label,
		caption,
		opened: _opened,
		...props
	},
	ref
) {
	const [opened, setOpened] = useState(_opened);

	const handleClick = (event) => {
		event.preventDefault();
		if (disabled) {
			return;
		}
		onClick?.(event);
		setOpened((v) => !v);
	};

	return (
		<>
			<XItem
				className={classNames({
					"x-item--opened": opened,
				})}
				role="button"
				onClick={handleClick}
			>
				{icon && (
					<XItemSection side>
						<XIcon>{icon}</XIcon>
					</XItemSection>
				)}
				<XItemSection>
					{label && <XItemLabel>{label}</XItemLabel>}
					{caption && <XItemLabel caption>{caption}</XItemLabel>}
				</XItemSection>
				<XItemSection side>
					<XChevron className="x-item__chevron" />
				</XItemSection>
			</XItem>
			<XCollapse className="x-list-items" active={opened}>
				{children}
			</XCollapse>
		</>
	);
});

XItemExpansion.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	dense: PropTypes.bool,
	color: PropTypes.string,
	active: PropTypes.bool,
	disabled: PropTypes.bool,
	vertical: PropTypes.bool,
	hoverable: PropTypes.bool,
	activeClass: PropTypes.string,
	tabIndex: PropTypes.number,
	role: PropTypes.string,
	onClick: PropTypes.func,
	icon: PropTypes.node,
	label: PropTypes.string,
	caption: PropTypes.string,
};
