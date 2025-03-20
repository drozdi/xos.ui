import PropTypes from "prop-types";
import { Unstyled } from "./unstyled";
const vars = {
	justify: "justify",
	align: "align",
	dir: "direction",
	wrap: "wrap",
};
export function Flex({ children, ...props }) {
	return (
		<Unstyled name="x-flex" className="x-flex" vars={vars} {...props}>
			{children}
		</Unstyled>
	);
}

// Проверка типов для пропсов
Flex.propTypes = {
	children: PropTypes.node,
	justify: PropTypes.string,
	align: PropTypes.string,
	dir: PropTypes.string,
	wrap: PropTypes.string,
};

// Устанавливаем displayName для удобства отладки
Flex.displayName = "internal/Unstyled";
