import PropTypes from "prop-types";
import { memo } from "react";

export const Slot = memo(function SlotFn({ children, name }) {
	return children;
});

Slot.propTypes = {
	children: PropTypes.node,
	name: PropTypes.string,
};

export const Template = memo(function TemplateFn({ children, name }) {
	return children;
});
Template.propTypes = {
	children: PropTypes.node,
	name: PropTypes.string,
};
