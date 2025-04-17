import PropTypes from "prop-types";
import { useCallback } from "react";
import { useDisclosure } from "../../hooks";
import { useId } from "../../hooks/use-id";
import { XPopoverProvider } from "./XPopoverContext";
import "./style.css";
import { usePopover } from './use-popover';

export function XPopover({ id, arrow, position = "bottom", offset, children }) {
	const popover = usePopover({
		position
	})
	const uid = useId(id);
	const [opened, { toggle: onToggle, open: onOpen, close: onClose }] =
		useDisclosure();
	console.log(popover);
	const reference = useCallback((node) => {
		  popover.floating.refs.setReference(node);
	}, [popover.floating.refs.setReference]);
	
	const floating = useCallback((node) => {
		popover.floating.refs.setFloating(node);
	}, [popover.floating.refs.setFloating]);

	return (
		<XPopoverProvider
			value={{
				uid,
				opened,
				getTargetId: () => `${uid}-target`,
				getDropdownId: () => `${uid}-dropdown`,
				//onToggle: () => {},
				onToggle,
				onOpen: () => {},
				onClose: () => {},
				arrow,
				position,
				offset,
				popover,
				reference,
				floating
			}}
		>
				{children}
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
