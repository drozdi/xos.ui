import { useCallback, useState } from "react";

/**
 * Функция useDisclosure создает состояние и обработчики для управления открытием и закрытием компонента.
 * @param {boolean} [initial=false] - Начальное значение состояния.
 * @param {Object} [options] - Объект с опциями.
 * @param {Function} [options.onOpen] - Функция, которая будет вызвана при открытии компонента.
 * @param {Function} [options.onClose] - Функция, которая будет вызвана при закрытии компонента.
 * @returns {Array} - Массив, содержащий текущее значение состояния и объект с обработчиками для открытия, закрытия и переключения состояния.
 */
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
