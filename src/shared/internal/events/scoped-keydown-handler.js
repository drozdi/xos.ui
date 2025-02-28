function getPreviousIndex(current, elements, loop) {
	for (let i = current - 1; i >= 0; i -= 1) {
		if (!elements[i].disabled) {
			return i;
		}
	}

	if (loop) {
		for (let i = elements.length - 1; i > -1; i -= 1) {
			if (!elements[i].disabled) {
				return i;
			}
		}
	}

	return current;
}

function getNextIndex(current, elements, loop) {
	for (let i = current + 1; i < elements.length; i += 1) {
		if (!elements[i].disabled) {
			return i;
		}
	}

	if (loop) {
		for (let i = 0; i < elements.length; i += 1) {
			if (!elements[i].disabled) {
				return i;
			}
		}
	}

	return current;
}

export function scopedKeydownHandler({
	parentSelector,
	siblingSelector,
	onKeyDown,
	loop = true,
	activateOnFocus = false,
	orientation,
}) {
	return (event) => {
		onKeyDown?.(event);
		const { target } = event;

		const elements = Array.from(
			target.closest(parentSelector).querySelectorAll(siblingSelector) || [],
		);
		const current = elements.findIndex((el) => target === el);
		const nextIndex = getNextIndex(current, elements, loop);
		const previousIndex = getPreviousIndex(current, elements, loop);

		switch (event.code) {
			case 'ArrowLeft': {
				if (orientation.includes('y')) {
					event.stopPropagation();
					event.preventDefault();
					elements[previousIndex].focus();
					activateOnFocus && elements[previousIndex].click();
				}
				break;
			}
			case 'ArrowRight': {
				if (orientation.includes('y')) {
					event.stopPropagation();
					event.preventDefault();
					elements[nextIndex].focus();
					activateOnFocus && elements[nextIndex].click();
				}
				break;
			}
			case 'ArrowDown': {
				if (orientation.includes('x')) {
					event.stopPropagation();
					event.preventDefault();
					elements[nextIndex].focus();
					activateOnFocus && elements[nextIndex].click();
				}
				break;
			}
			case 'ArrowUp': {
				if (orientation.includes('x')) {
					event.stopPropagation();
					event.preventDefault();
					elements[previousIndex].focus();
					activateOnFocus && elements[previousIndex].click();
				}
				break;
			}
			case 'Home': {
				event.stopPropagation();
				event.preventDefault();
				!elements[0].disabled && elements[0].focus();
				break;
			}
			case 'End': {
				event.stopPropagation();
				event.preventDefault();
				const last = elements.length - 1;
				!elements[last].disabled && elements[last].focus();
				break;
			}
		}
	};
}
