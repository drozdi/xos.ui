import { useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from '../../utils/debounce';
import { extractEventHandlers } from '../internal/events/extract-event-handlers';
import { useForkRef } from './useForkRef';
const validation = (value, rules = []) => {
	return rules.map((rule) => rule(value)).filter((v) => v !== true);
};
export const useInput = (
	{
		value: initialValue,
		disabled = false,
		required = false,
		multiple = false,
		readOnly = false,
		rules = [],
		lazyRules = false,
		...other
	},
	externalRef,
) => {
	const [value, setValue] = useState(multiple ? [].concat(initialValue) : initialValue);
	const [dirty, setDirty] = useState(false);
	const [isValid, setIsValid] = useState(true);

	const inputRef = useRef();
	const handleRef = useForkRef(externalRef, inputRef);
	const externalEventHandlers = {
		...extractEventHandlers(other),
	};

	const [errors, setErrors] = useState(!lazyRules ? validation(value, rules) : []);

	const error = useMemo(() => errors.length > 0, [errors]);

	const checkValue = debounce((value) => {
		setErrors(validation(value, rules));
	}, 100);

	const createHandleFocus = (otherHandlers) => (event) => {
		otherHandlers.onFocus?.(event);
	};
	const createHandleBlur = (otherHandlers) => (event) => {
		otherHandlers.onBlur?.(event);
		setDirty(true);
	};

	const createHandleChange =
		(otherHandlers) =>
		(event, ...args) => {
			const element = event.target || inputRef.current;
			setValue(element.value);
			otherHandlers.onChange?.(event, ...args);
		};

	const createHandleClick = (otherHandlers) => (event) => {
		if (inputRef.current && event.currentTarget === event.target) {
			inputRef.current.focus();
		}
		otherHandlers.onClick?.(event);
	};

	//todo: onChange onInput ???
	const createHandleInput =
		(otherHandlers) =>
		(event, ...args) => {
			const element = event.target || inputRef.current;
			setValue(element.value);
			otherHandlers.onInput?.(event, ...args);
		};

	useEffect(() => {
		checkValue(value);
	}, [value]);

	return {
		value,
		dirty,
		error,
		errors,
		disabled,
		inputRef,
		attrs: {
			'aria-invalid': error || undefined,
			'aria-required': required || undefined,
			'aria-errormessage': other['aria-errormessage'],
			'aria-activedescendant': other['aria-activedescendant'],
			'aria-autocomplete': other['aria-autocomplete'],
			'aria-haspopup': other['aria-haspopup'],
			'aria-controls': other['aria-controls'],
			//value,
			required,
			disabled,
			readOnly,
			ref: handleRef,
			...extractEventHandlers,
			onBlur: createHandleBlur(externalEventHandlers),
			onFocus: createHandleFocus(externalEventHandlers),
			onClick: createHandleClick(externalEventHandlers),
			onChange: createHandleChange(externalEventHandlers),
		},
	};
};
