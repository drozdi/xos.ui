import { useCallback, useState } from "react";

export function useDisclosure(initial = false, { onOpen, onClose } = {}) {
	const [opened, setOpened] = useState(initial);

	const open = useCallback(
		(...args) => {
			setOpened((isOpened) => {
				if (!isOpened) {
					onOpen?.(...args);
					return true;
				}
				return isOpened;
			});
		},
		[onOpen]
	);

	const close = useCallback(
		(...args) => {
			setOpened((isOpened) => {
				if (isOpened) {
					onClose?.(...args);
					return false;
				}
				return isOpened;
			});
		},
		[onClose]
	);

	const toggle = useCallback(
		(...args) => {
			opened ? close(...args) : open(...args);
		},
		[close, open, opened]
	);

	return [opened, { open, close, toggle }];
}
