import PropTypes from "prop-types";
import { useMemo } from "react";
import { useId } from "../../hooks/useId";
import { XInputControlProvider } from "./XInputControlContext";
import "./style.css";

export function XInputControl({ id, children }) {
	const uid = useId(id);
	const context = useMemo(
		() => ({
			inputId: `${uid}-input`,
			labelId: `${uid}-label`,
			errorId: `${uid}-error`,
			hintId: `${uid}-hint`,
		}),
		[uid]
	);
	return (
		<XInputControlProvider value={context}>
			{children}
		</XInputControlProvider>
	);
}

XInputControl.propTypes = {
	id: PropTypes.string,
	children: PropTypes.node,
};
