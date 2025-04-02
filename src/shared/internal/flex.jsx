import PropTypes from "prop-types";
import { forwardRef, useMemo } from "react";
import { Unstyled } from "./unstyled";

// Замораживаем объект для предотвращения случайных изменений
const FLEX_VARS = Object.freeze({
	justify: "justify",
	align: "align",
	dir: "direction",
	wrap: "wrap",
});

// Создаем общий тип для responsive-пропсов
const responsivePropType = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.shape({
		xl: PropTypes.string,
		lg: PropTypes.string,
		md: PropTypes.string,
		sm: PropTypes.string,
		xs: PropTypes.string,
		base: PropTypes.string,
	}),
]);

export const Flex = forwardRef(
	({ children, className = "", ...props }, ref) => {
		const combinedClassName = useMemo(
			() => `x-flex ${className}`.trim(),
			[className]
		);
		return (
			<Unstyled
				name="x-flex"
				className={combinedClassName}
				vars={FLEX_VARS}
				ref={ref}
				{...props}
			>
				{children}
			</Unstyled>
		);
	}
);

// Проверка типов для пропсов
Flex.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	justify: responsivePropType,
	align: responsivePropType,
	dir: responsivePropType,
	wrap: responsivePropType,
};

// Устанавливаем displayName для удобства отладки
Flex.displayName = "internal/Unstyled";
