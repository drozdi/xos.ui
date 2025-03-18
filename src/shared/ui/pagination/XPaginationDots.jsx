import classNames from "classnames";
import PropTypes from "prop-types";
import { XIcon } from "../icon";
import "./style.css";

export const XPaginationDots = ({ className }) => {
	return (
		<div className={classNames("x-pagination-dots", className)}>
			<XIcon>mdi-dots-horizontal</XIcon>
		</div>
	);
};

XPaginationDots.propTypes = {
	className: PropTypes.string,
};
