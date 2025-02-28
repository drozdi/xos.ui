import classNames from "classnames";
import PropTypes from "prop-types";
import "./style.css";

export function XItemSection({
	children,
	className,
	side,
	top,
	noWrap,
	avatar,
	thumbnail,
}) {
	const isSide = side || thumbnail || avatar;
	return (
		<div
			className={classNames("x-item__section", className, {
				"x-item__section--main": !isSide,
				"x-item__section--side": isSide,
				"x-item__section--top": top,
				"x-item__section--nowrap": noWrap,
				"x-item__section--avatar": avatar,
				"x-item__section--thumbnail": thumbnail,
			})}
		>
			{children}
		</div>
	);
}

XItemSection.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	top: PropTypes.bool,
	side: PropTypes.bool,
	noWrap: PropTypes.bool,
	avatar: PropTypes.bool,
	thumbnail: PropTypes.bool,
};
