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

const useRenderEffect = !isUndefined(document) ? useLayoutEffect : useEffect;

function createTeleportNode(props) {
	const node = document.createElement("div");
	node.setAttribute("data-teleport", "true");
	isString(props.className) &&
		node.classList.add(...props.className.split(" ").filter(Boolean));
	isObject(props.style) && Object.assign(node.style, props.style);
	isString(props.id) && node.setAttribute("id", props.id);
	return node;
}

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
	}, [target]);
	if (!mounted || !nodeRef.current) {
		return null;
	}
	return createPortal(<>{children}</>, nodeRef.current);
});
