import PropTypes from "prop-types";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { debounce } from "../../utils/debounce";

/**
 * Получает текущие размеры окна браузера
 *
 * @returns {Object} Объект с свойствами top, left, width, height, right и bottom.
 * @returns {number} returns.top - Позиция окна сверху, всегда 0.
 * @returns {number} returns.left - Позиция окна слева, всегда 0.
 * @returns {number} returns.width - Ширина окна.
 * @returns {number} returns.height - Высота окна.
 * @returns {number} returns.right - Позиция окна справа, совпадает с шириной.
 * @returns {number} returns.bottom - Позиция окна снизу, совпадает с высотой.
 */
function getWindowSize() {
	if (typeof window === "undefined") {
		return {
			width: 0,
			height: 0,
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
		};
	}
	return {
		top: 0,
		left: 0,
		width: window.innerWidth,
		height: window.innerHeight,
		right: window.innerWidth,
		bottom: window.innerHeight,
	};
}

// Контекст по умолчанию (наблюдает за window)
const initialContext = {
	...getWindowSize(),
	ref: { current: null },
	isObservingElement: false,
};

/**
 * Контекст для работы с ResizeObserver
 */
const ResizeObserverContext = createContext(initialContext);

/**
 * Компонент ResizeObserverProvider
 * @param {Object} props - свойства
 * @param {React.ReactNode} props.children - дочерние элементы
 * @param {Function} props.onResize - функция, которая будет вызвана при изменении размера
 * @param {number} [props.debounceTime=200] - время задержки в миллисекундах
 * @param {string} [props.boxModel="content-box"] - модель коробки
 * @returns {React.ReactElement} элемент ResizeObserverProvider
 */
export function ResizeObserverProvider({
	children,
	onResize,
	debounceTime = 200,
	boxModel = "content-box",
}) {
	const [size, setSize] = useState(initialContext);
	const parentRef = useRef();
	const observerRef = useRef();
	const latestSizeRef = useRef(size);

	const updateSize = useCallback(
		(newSize, isObservingElement) => {
			const sizeWithMeta = {
				...newSize,
				isObservingElement,
			};
			if (
				JSON.stringify(sizeWithMeta) !==
				JSON.stringify(latestSizeRef.current)
			) {
				latestSizeRef.current = sizeWithMeta;
				setSize(sizeWithMeta);
				onResize?.(sizeWithMeta);
			}
		},
		[onResize]
	);

	const handleResize = useCallback(
		(entries) => {
			if (!parentRef.current) {
				// Наблюдаем за окном, если нет элемента
				updateSize(getWindowSize(), false);
				return;
			}

			// Наблюдаем за элементом
			const entry = entries?.[0];
			if (!entry) {
				return;
			}

			const rect = entry.contentRect;
			const newSize = {
				width: rect.width,
				height: rect.height,
				top: rect.top,
				left: rect.left,
				bottom: rect.bottom,
				right: rect.right,
			};

			if (boxModel === "border-box") {
				const borderBoxSize = entry.borderBoxSize?.[0];
				if (borderBoxSize) {
					newSize.width = borderBoxSize.inlineSize;
					newSize.height = borderBoxSize.blockSize;
				}
			}

			updateSize(newSize, true);
		},
		[boxModel, updateSize]
	);

	const debouncedResize = useCallback(
		debounce(handleResize, debounceTime ?? 200),
		[debounceTime, handleResize]
	);

	useEffect(() => {
		if (parentRef.current) {
			// Наблюдаем за родительским элементом
			observerRef.current = new ResizeObserver(debouncedResize);
			observerRef.current.observe(parentRef.current);
		} else if (typeof window !== "undefined") {
			// Наблюдаем за окном
			window.addEventListener("resize", debouncedResize);
			handleResize(); // Инициализация
		}

		return () => {
			window?.removeEventListener("resize", debouncedResize);
			observerRef.current?.disconnect();
			debouncedResize.cancel?.();
		};
	}, [debouncedResize, handleResize]);

	return (
		<ResizeObserverContext.Provider value={{ ...size, ref: parentRef }}>
			{children}
		</ResizeObserverContext.Provider>
	);
}

ResizeObserverProvider.propTypes = {
	children: PropTypes.node,
	onResize: PropTypes.func,
	debounceTime: PropTypes.number,
	boxModel: PropTypes.oneOf(["content-box", "border-box"]),
};

export function useResizeObserver() {
	return useContext(ResizeObserverContext);
}
