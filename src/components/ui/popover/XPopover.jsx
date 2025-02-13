import PropTypes from "prop-types";
import { useDisclosure } from "../../hooks/useDisclosure";
import { useId } from "../../hooks/useId";
import { XPopoverProvider } from "./XPopoverContext";
import "./style.css";

export function XPopover({ id, arrow, position = "bottom", offset, children }) {
	const uid = useId(id);
	const [
		opened,
		/*{
			toggle: onToggle, open: onOpen, close: onClose 
		},*/
	] = useDisclosure();

	return (
		<XPopoverProvider
			value={{
				uid,
				opened,
				getTargetId: () => `${uid}-target`,
				getDropdownId: () => `${uid}-dropdown`,
				onToggle: () => {},
				onOpen: () => {},
				onClose: () => {},
				arrow,
				position,
				offset,
			}}
		>
			<div className="x-popover">{children}</div>
		</XPopoverProvider>
	);
}
XPopover.propTypes = {
	children: PropTypes.node,
	id: PropTypes.string,
	arrow: PropTypes.bool,
	offset: PropTypes.string,
	position: PropTypes.oneOf([
		"top",
		"top-start",
		"top-end",
		"bottom",
		"bottom-start",
		"bottom-end",
		"left",
		"left-start",
		"left-end",
		"right",
		"right-start",
		"right-end",
	]),
};
