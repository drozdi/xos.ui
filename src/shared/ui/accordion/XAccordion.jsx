import classNames from "classnames";
import PropTypes from "prop-types";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useId } from "../../hooks/use-id";
import { scopedKeydownHandler } from "../../internal/events/scoped-keydown-handler";
import { isArray } from "../../utils/is";
import { XAccordionProvider } from "./XAccordionContext";
import { XAccordionHeader } from "./XAccordionHeader";
import { XAccordionPanel } from "./XAccordionPanel";
import { XAccordionTab } from "./XAccordionTab";

/**
* Компонент XAccordion
* @param {Object} props - свойства
* @param {string} props.id - уникальный идентификатор
* @param {React.ReactNode} props.children - дочерние элементы
* @param {string} props.className - классы
* @param {boolean} props.multiple - флаг, указывающий на то, может ли быть выбрано несколько элементов
* @param {boolean} props.border - флаг, указывающий на то, есть ли граница
* @param {boolean} props.filled - флаг, указывающий на то, заполнен ли компонент
* @param {boolean} props.square - флаг, указывающий на то, имеет ли компонент квадратную форму
* @param {boolean} props.separated - флаг, указывающий на то, разделены ли элементы
* @param {Function} props.onChange - функция, которая будет вызвана при изменении состояния
* @param {number|string|array} props.value - значение компонента
* @param {string} props.name - имя компонента
* @returns {React.ReactElement} элемент XAccordion
*/
export function XAccordion({
   id,
   children,
   className,
   multiple,
   border,
   filled,
   square,
   separated,
   onChange,
   value: propsValue,
   name,
   ...props
}) {
   const uid = useId(id);
   const [current, setCurrent] = useState(
   	multiple ? [].concat(propsValue) : propsValue ?? undefined
   );

   const handleChange = useCallback((event, value) => {
   	onChange?.({
   		...event,
   		value,
   		target: {
   			...event.target,
   			name: name,
   			id: uid,
   			value,
   		},
   		stopPropagation: () => {
   			event.stopPropagation?.();
   		},
   		preventDefault: () => {
   			event.preventDefault?.();
   		},
   	});
   	setCurrent(() => value);
   }, [name, onChange, uid]);

   const context = useMemo(() => {
   	return {
   		value: current,
   		isActive: (value) => {
   			if (multiple && isArray(current)) {
   				return current.includes(value);
   			}
   			return current === value;
   		},
   		getHeaderId: (value) => {
   			return `${uid}-header-${value}`;
   		},
   		getPanelId: (value) => {
   			return `${uid}-panel-${value}`;
   		},
   		getTabId: (value) => {
   			return `${uid}-tab-${value}`;
   		},
   		onChange: (event, value) => {
   			let newValue;
   			if (multiple) {
   				newValue = [].concat(current);
   				if (!newValue.includes(value)) {
   					newValue.push(value);
   				} else {
   					newValue = newValue.filter((v) => v !== value);
   				}
   			} else {
   				newValue = current === value ? undefined : value;
   			}

   			handleChange(event, newValue);
   		},
   		onKeyDown: scopedKeydownHandler({
   			parentSelector: ".x-accordion",
   			siblingSelector: 'button, [role="button"]',
   			loop: true,
   			activateOnFocus: !multiple,
   			orientation: "xy",
   		}),
   	};
   }, [uid, current, multiple, handleChange]);

   useLayoutEffect(() => {
   	let newValue;
   	if (isArray(current) && !multiple) {
   		newValue = current[0] ?? undefined;
   	} else if (!isArray(current) && multiple) {
   		newValue = current ? [current] : [];
   	} else {
   		newValue = multiple ? [] : undefined;
   	}
   	handleChange({}, newValue);
   }, [multiple]);

   useLayoutEffect(() => {
   	setCurrent(() =>
   		multiple ? [].concat(propsValue) : propsValue ?? undefined
   	);
   }, [multiple, propsValue]);

   return (
   	<div
   		{...props}
   		id={uid}
   		className={classNames("x-accordion", className, {
   			"x-accordion--border": border,
   			"x-accordion--filled": filled,
   			"x-accordion--square": square,
   			"x-accordion--separated": separated,
   		})}
   	>
   		<XAccordionProvider value={context}>{children}</XAccordionProvider>
   	</div>
   );
}

XAccordion.Tab = XAccordionTab;
XAccordion.Header = XAccordionHeader;
XAccordion.Panel = XAccordionPanel;

XAccordion.propTypes = {
   id: PropTypes.string,
   children: PropTypes.node,
   className: PropTypes.string,
   name: PropTypes.string,
   value: PropTypes.oneOfType([
   	PropTypes.number,
   	PropTypes.arrayOf(
   		PropTypes.oneOfType([PropTypes.number, PropTypes.string])
   	),
   	PropTypes.string,
   ]),
   multiple: PropTypes.bool,
   border: PropTypes.bool,
   filled: PropTypes.bool,
   square: PropTypes.bool,
   separated: PropTypes.bool,
   onChange: PropTypes.func,
};
;
