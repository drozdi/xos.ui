import PropTypes from "prop-types";
import {
	forwardRef,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { createPortal } from "react-dom";
import { isObject, isString, isUndefined } from "../../utils/is";
import { setRef } from "../hooks/useForkRef";

/**
 * Определяем, какой хук эффекта использовать (useLayoutEffect или useEffect)
 * */
const useRenderEffect = !isUndefined(document) ? useLayoutEffect : useEffect;

/**
 * Создания узла телепорта
 * @param {object} props - свойства
 * @returns {HTMLDivElement} узел телепорта
 * */
function createTeleportNode(props) {
	const node = document.createElement("div");
	node.setAttribute("data-teleport", "true");

	if (isString(props.className)) {
		node.classList.add(...props.className.split(" ").filter(Boolean));
	}

	if (isObject(props.style)) {
		Object.assign(node.style, props.style);
	}

	if (isString(props.id)) {
		node.setAttribute("id", props.id);
	}

	return node;
}

/**
 * Компонент Teleport
 * @type {React.ForwardRefExoticComponent}
 * @param {object} props - свойства
 * @param {string} props.className - классы
 * @param {object} props.style - стили
 * @param {string} props.id - id
 * @param {React.ReactElement} props.children - дочерние элементы
 * @param {string|React.ReactElement} props.target - целевой элемент или строка с селектором
 * @param {React.Ref} ref - ссылка
 * @returns {React.ReactElement} элемент телепорта
 */
export const Teleport = forwardRef(function Teleport(
	{ children, target, ...props },
	ref
) {
	const [mounted, setMounted] = useState(false);
	const nodeRef = useRef(null);

	useRenderEffect(() => {
		setMounted(true);

		nodeRef.current = !target
			? createTeleportNode(props)
			: isString(target)
			? document.querySelector(target)
			: target;

		setRef(ref, nodeRef.current);

		if (!target && nodeRef.current) {
			document.body.appendChild(nodeRef.current);
		}

		return () => {
			if (!target && nodeRef.current) {
				document.body.removeChild(nodeRef.current);
			}
		};
	}, [target, ref, props]);

	if (!mounted || !nodeRef.current) {
		return null;
	}

	return createPortal(<>{children}</>, nodeRef.current);
});

Teleport.propTypes = {
	children: PropTypes.node.isRequired,
	target: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	className: PropTypes.string,
	style: PropTypes.object,
	id: PropTypes.string,
};

Teleport.displayName = "Teleport";
