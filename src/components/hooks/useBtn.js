import { useRef } from 'react';
import { extractEventHandlers } from '../internal/events/extract-event-handlers';
import { useForkRef } from './useForkRef';
export function useBtn(
	{
		type = 'button',
		role = 'button',
		disabled: isDisabled,
		loading: isLoading,
		active: isActive,
		tabIndex,
		value,
		title,
		target,
		href,
		rel,
		...rest
	},
	externalRef,
) {
	const buttonRef = useRef();
	const handleRef = useForkRef(buttonRef, externalRef);
	const externalEventHandlers = {
		...extractEventHandlers(rest),
	};
	const nativeElement = () => buttonRef.current;
	const isNativeButton = () => {
		const button = buttonRef.current;
		return (
			button?.tagName === 'BUTTON' ||
			(button?.tagName === 'INPUT' &&
				['button', 'submit', 'reset'].includes(button?.type))
		);
	};
	const createHandleClick = (otherHandlers) => (event) => {
		if (!isDisabled && !isLoading) {
			otherHandlers.onClick?.(event, value);
		}
	};
	const createHandleKeyDown = (otherHandlers) => (event) => {
		otherHandlers.onKeyDown?.(event);

		if (
			event.target === event.currentTarget &&
			!isNativeButton() &&
			event.key === ' '
		) {
			event.preventDefault();
		}

		if (
			event.target === event.currentTarget &&
			!isNativeButton() &&
			event.key === 'Enter' &&
			!isDisabled &&
			!isLoading
		) {
			otherHandlers.onClick?.(event);
			event.preventDefault();
		}
	};
	const createHandleKeyUp = (otherHandlers) => (event) => {
		otherHandlers.onKeyUp?.(event);

		if (
			event.target === event.currentTarget &&
			!isNativeButton() &&
			!isDisabled &&
			event.key === ' '
		) {
			otherHandlers.onClick?.(event);
		}
	};
	let additionalProps = {
		role,
		title,
		disabled: isDisabled,
		tabIndex: !isDisabled ? (tabIndex ?? 0) : -1,
		ref: handleRef,
	};
	if (isNativeButton()) {
		additionalProps = {
			...additionalProps,
			type,
		};
	} else {
		additionalProps = {
			...additionalProps,
			href: nativeElement()?.tagName === 'A' && !isDisabled ? href : undefined,
			target: nativeElement()?.tagName === 'A' ? target : undefined,
			type: nativeElement()?.tagName === 'INPUT' ? type : undefined,
			disabled: nativeElement()?.tagName === 'INPUT' ? isDisabled : undefined,
			'aria-disabled':
				!isDisabled || nativeElement()?.tagName === 'INPUT'
					? undefined
					: isDisabled,
			rel: nativeElement()?.tagName === 'A' ? rel : undefined,
		};
	}
	let actionProps = {
		...externalEventHandlers,
		onClick: createHandleClick(externalEventHandlers),
		onKeyDown: createHandleKeyDown(externalEventHandlers),
		onKeyUp: createHandleKeyUp(externalEventHandlers),
	};

	return {
		active: isActive,
		disabled: isDisabled,
		loading: isLoading,
		buttonRef,
		attrs: {
			...actionProps,
			...additionalProps,
			'aria-haspopup': rest['aria-haspopup'],
			'aria-expanded': rest['aria-expanded'],
			'aria-controls': rest['aria-controls'],
			'aria-pressed': rest['aria-pressed'],
		},
	};
}
