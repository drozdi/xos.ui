import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { matchesSelectorToParentElements } from '../utils/domFns';

export const KEYS_LEFT = ['ArrowLeft', 'Left'];
export const KEYS_RIGHT = ['ArrowRight', 'Right'];
export const KEYS_UP = ['ArrowUp', 'Up'];
export const KEYS_DOWN = ['ArrowDown', 'Down'];
export const KEYS_AXIS_X = [...KEYS_LEFT, ...KEYS_RIGHT];
export const KEYS_AXIS_Y = [...KEYS_UP, ...KEYS_DOWN];
export const KEYS_POSITIVE = [...KEYS_RIGHT, ...KEYS_DOWN];

export function useDraggable({
	axis = 'xy',
	disabled = false,
	reverse = false,
	initial = [0, 0],
	min = [0, 0],
	max = [null, null],
	handle = '',
	cancel = '',
	step = 10,
	shiftStep = 50,
	onStart = () => {},
	onMove = () => {},
	onEnd = () => {},
}) {
	const runConstraints = useCallback(
		(width, height) => {
			if (!min && !max) {
				return [width, height];
			}
			if (min) {
				width = Math.max(min[0], width);
				height = Math.max(min[1], height);
			}
			if (max) {
				width = Math.min(max[0] || width, width);
				height = Math.min(max[1] || height, height);
			}
			return [width, height];
		},
		[min, max],
	);

	const initialPosition = useMemo(
		() => runConstraints(...initial),
		[runConstraints, initial],
	);

	const [position, setPosition] = useState(initialPosition);
	const [endPosition, setEndPosition] = useState(initialPosition);
	const [isDragging, setDragging] = useState(false);
	const dragging = useRef(false);
	const positionRef = useRef(initialPosition);

	const canX = useMemo(() => axis.includes('x'), [axis]);
	const canY = useMemo(() => axis.includes('y'), [axis]);

	const mousePosition = { x: 0, y: 0 };

	const handleMove = useCallback(
		(event) => {
			if (!dragging.current) {
				return;
			}
			const deltaX = canX ? event.clientX - mousePosition.x : 0;
			const deltaY = canY ? event.clientY - mousePosition.y : 0;
			if (!(Math.abs(deltaX) > 0 || Math.abs(deltaY) > 0)) {
				return;
			}

			const newPosition = runConstraints(
				position[0] + (reverse ? -deltaX : deltaX),
				position[1] + (reverse ? -deltaY : deltaY),
			);

			onMove(event, {
				position: newPosition,
			});

			setPosition(() => newPosition);
			positionRef.current = newPosition;
		},
		[canX, canY, reverse, position, runConstraints, onMove],
	);

	const handleUp = useCallback(
		(event) => {
			document.removeEventListener('pointermove', handleMove);
			document.removeEventListener('pointerup', handleUp);
			onEnd(event, {
				position: positionRef.current,
			});
			dragging.current = false;
			setDragging(() => false);

			setPosition(() => positionRef.current);
			setEndPosition(() => positionRef.current);
		},
		[handleMove, onEnd],
	);

	const handleDown = useCallback(
		(event) => {
			if (
				disabled ||
				(handle &&
					!matchesSelectorToParentElements(event.target, handle, document)) ||
				(cancel &&
					!matchesSelectorToParentElements(event.target, cancel, document))
			) {
				return;
			}
			event.stopPropagation();
			event.preventDefault();

			if (!canX && !canY) {
				return;
			}

			dragging.current = true;
			setDragging(true);

			mousePosition.x = event.clientX;
			mousePosition.y = event.clientY;

			onStart(event, {
				position,
			});

			document.addEventListener('pointermove', handleMove);
			document.addEventListener('pointerup', handleUp);
		},
		[
			disabled,
			handle,
			cancel,
			canX,
			canY,
			reverse,
			position,
			onStart,
			handleMove,
			handleUp,
		],
	);

	const handleKeyDown = useCallback(
		(event) => {
			if (disabled) {
				return;
			}
			if (event.key === 'Enter') {
				setPosition(() => initialPosition);
				positionRef.current = initialPosition;
				return;
			}
			if (
				(canX && !KEYS_AXIS_X.includes(event.key)) ||
				(canY && !KEYS_AXIS_Y.includes(event.key))
			) {
				return;
			}

			if (onStart) {
				onStart(event, {
					position: positionRef.current,
				});
			}

			const changeStep = event.shiftKey ? shiftStep : step;
			const reversed = reverse ? -1 : 1;
			const dir = KEYS_POSITIVE.includes(event.key) ? reversed : -1 * reversed;

			const newPosition = runConstraints(
				position[0] + (canX ? changeStep * dir : 0),
				position[1] + (canY ? changeStep * dir : 0),
			);
			setPosition(() => newPosition);
			positionRef.current = newPosition;

			if (onEnd) {
				onEnd(event, {
					position: positionRef.current,
				});
			}
		},
		[
			disabled,
			initialPosition,
			runConstraints,
			onStart,
			onEnd,
			position,
			canX,
			canY,
			step,
			shiftStep,
			reverse,
		],
	);

	const containerRef = useRef(null);
	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.addEventListener('pointerdown', handleDown);
			containerRef.current.addEventListener('keydown', handleKeyDown);
		}
		return () => {
			if (containerRef.current) {
				containerRef.current.removeEventListener('pointerdown', handleDown);
				containerRef.current.removeEventListener('keydown', handleKeyDown);
			}
		};
	}, [containerRef, handleDown, handleKeyDown]);

	return {
		position,
		setPosition,
		endPosition,
		isDragging,
		containerRef,
		events: {
			onPointerDown: handleDown,
			onKeyDown: handleKeyDown,
		},
	};
}
