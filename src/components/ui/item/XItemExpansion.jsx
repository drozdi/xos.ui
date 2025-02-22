import PropTypes from "prop-types";
import { forwardRefWithAs } from "../../internal/render";
import { XChevron, XIcon } from "../icon";
import "./style.css";
import { XItem } from "./XItem";
import { XItemLabel } from "./XItemLabel";
import { XItemSection } from "./XItemSection";
const clickableTag = ["a", "label", "navLink"];
const disRoleTag = ["label"];
const disDisabledTag = ["div", "span", "a", "label"];

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
		...props
	},
	ref
) {
	return (
		<XItem role="button">
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
				<XChevron />
			</XItemSection>
		</XItem>
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
