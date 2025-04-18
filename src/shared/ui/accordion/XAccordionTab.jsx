import classNames from "classnames";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { useId } from "../../hooks/use-id";
import "./style.css";
import { useXAccordionContext } from "./XAccordionContext";
import { XAccordionTabProvider } from "./XAccordionTabContext";

/**
* Компонент XAccordionTab представляет собой вкладку аккордеона.
*
* @param {Object} props - Свойства компонента.
* @param {string} [props.id] - Уникальный идентификатор вкладки.
* @param {boolean} [props.active] - Флаг, указывающий, активна ли вкладка.
* @param {string} [props.className] - Дополнительные CSS-классы для вкладки.
* @param {ReactNode} props.children - Дочерние элементы вкладки.
* @param {boolean} [props.disabled] - Флаг, указывающий, отключена ли вкладка.
* @param {string} props.value - Значение вкладки.
* @returns {ReactElement} Элемент React, представляющий вкладку аккордеона.
*/
export function XAccordionTab({
   id,
   active,
   className,
   children,
   disabled,
   value,
   ...props
}) {
   const ctx = useXAccordionContext();
   const isActive = ctx?.isActive(value);
   const [expanded, setExpanded] = useState(isActive ?? active);
   const uid = useId(id ?? ctx?.getTabId(value));

   const context = useMemo(() => {
   	return {
   		value,
   		disabled,
   		active: isActive ?? expanded,
   		getPanelId: () => ctx?.getPanelId(value) ?? `${uid}-panel`,
   		getHeaderId: () => ctx?.getHeaderId(value) ?? `${uid}-header`,
   		onKeyDown: ctx?.onKeyDown,
   		onToggleExpanded: (event) => {
   			if (disabled) {
   				return;
   			}
   			ctx?.onChange?.(event, value);
   			ctx || setExpanded((v) => !v);
   		},
   	};
   }, [value, disabled, isActive, expanded, uid, ctx]);

   return (
   	<div
   		{...props}
   		id={uid}
   		className={classNames(
   			"x-accordion-tab",
   			{
   				"x-accordion-tab--expanded": isActive ?? expanded,
   				"x-accordion-tab--disabled": disabled,
   			},
   			className
   		)}
   	>
   		<XAccordionTabProvider value={context}>
   			{children}
   		</XAccordionTabProvider>
   	</div>
   );
}

XAccordionTab.propTypes = {
   id: PropTypes.string,
   children: PropTypes.node,
   className: PropTypes.string,
   active: PropTypes.bool,
   disabled: PropTypes.bool,
   value: PropTypes.string,
};
;
