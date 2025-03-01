import PropTypes from "prop-types";
import { createContext, useContext } from "react";

/**
 * Создаем контекст с значением по умолчанию `undefined`
 * для управления состоянием "disabled".
 */
const DisabledContext = createContext(undefined);

/**
 * Хук для использования контекста DisabledContext.
 *
 * @returns {boolean} Значение контекста (состояние "disabled").
 */
export function useDisabled() {
	return useContext(DisabledContext);
}

/**
 * Провайдер для управления состоянием "disabled".
 *
 * @param {Object} props - Параметры компонента.
 * @param {boolean} props.value - Значение состояния "disabled".
 * @param {React.ReactNode} props.children - Дочерние элементы.
 * @returns {JSX.Element} Провайдер контекста.
 */
export function DisabledProvider({ value, children }) {
	return (
		<DisabledContext.Provider value={value}>
			{children}
		</DisabledContext.Provider>
	);
}

// Проверка типов для пропсов
DisabledProvider.propTypes = {
	value: PropTypes.bool.isRequired, // Значение должно быть boolean
	children: PropTypes.node.isRequired, // Дочерние элементы обязательны
};

// Устанавливаем displayName для удобства отладки
DisabledProvider.displayName = "DisabledProvider";
