import classNames from "classnames";
import PropTypes from "prop-types";
import { render } from "./render";

export function Unstyled({ color, size, className, ...props }) {
	return render("div", { ...props, className: classNames(className) });
}

Unstyled.propTypes = {
	color: PropTypes.any,
	size: PropTypes.any,
	className: PropTypes.any,
};

Unstyled.displayName = "internal/Unstyled";
