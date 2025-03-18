import PropTypes from "prop-types";
import { XIcon } from "../icon";
import { XPaginationBtn } from "./XPaginationBtn";
import { useXPaginationContext } from "./XPaginationContext";
import "./style.css";

function createEdgeComponent({ icon, name, action, type }) {
	let Component = (props) => {
		const ctx = useXPaginationContext();
		const disabled =
			type === "next" ? ctx.current === ctx.total : ctx.current === 1;
		return (
			<XPaginationBtn
				{...props}
				onClick={ctx[action]}
				disabled={ctx.disabled || disabled}
			>
				<XIcon>{icon}</XIcon>
			</XPaginationBtn>
		);
	};

	Component.propTypes = {
		className: PropTypes.string,
	};
	Component.displayName = `ui/${name}`;
	return Component;
}

export const XPaginationNext = createEdgeComponent({
	icon: "mdi-chevron-right",
	name: "XPaginationNext",
	action: "onNext",
	type: "next",
});

export const XPaginationPrevious = createEdgeComponent({
	icon: "mdi-chevron-left",
	name: "XPaginationPrevious",
	action: "onPrevious",
	type: "previous",
});

export const XPaginationFirst = createEdgeComponent({
	icon: "mdi-chevron-double-left",
	name: "XPaginationFirst",
	action: "onFirst",
	type: "previous",
});

export const XPaginationLast = createEdgeComponent({
	icon: "mdi-chevron-double-right",
	name: "XPaginationLast",
	action: "onLast",
	type: "next",
});
