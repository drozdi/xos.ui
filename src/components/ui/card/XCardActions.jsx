import classNames from "classnames";
import PropTypes from "prop-types";
import "./style.css";
export function XCardActions({ children, className, horizontal, align }) {
	return (
		<div
			className={classNames("x-card__actions", className, {
				"x-card__actions--horizontal": horizontal,
				"justify-start": horizontal && align === "start",
				"justify-center": horizontal && align === "center",
				"justify-end": horizontal && align === "end",
				"items-start": !horizontal && align === "start",
				"items-center": !horizontal && align === "center",
				"items-end": !horizontal && align === "end",
			})}
		>
			{children}
		</div>
	);
}

XCardActions.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	horizontal: PropTypes.bool,
	align: PropTypes.oneOf(["start", "center", "end"]),
};
