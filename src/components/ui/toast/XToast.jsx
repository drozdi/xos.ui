import classNames from 'classnames';
import { forwardRef, memo, useImperativeHandle, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { XMessages } from '../messages';
import './style.css';
import { XToastProvider } from './XToastContext';

export const XToast = memo(
	forwardRef(
		(
			{
				position = 'right-top',
				underlined,
				life,
				closable,
				color,
				outline,
				square,
			},
			ref,
		) => {
			const containerRef = useRef(null);
			const mesgs = useRef(null);
			const under = useMemo(() => {
				if (!underlined) {
					return undefined;
				}
				const p = position.split('-');
				if (p[0] === 'left') {
					return 'right';
				} else if (p[0] === 'right') {
					return 'left';
				} else if (p[1] === 'top') {
					return 'top';
				} else if (p[1] === 'bottom') {
					return 'bottom';
				}
				return undefined;
			}, [position, underlined]);
			const show = (message) => {
				mesgs.current?.show(message);
			};
			const replace = (message) => {
				mesgs.current?.replace(message);
			};
			const clear = () => {
				mesgs.current?.clear();
			};
			useImperativeHandle(ref, () => ({
				show,
				replace,
				clear,
				getElement: () => containerRef.current,
			}));
			return createPortal(
				<div
					className={classNames('x-toast', {
						[`x-toast--${position}`]: position,
					})}
					ref={containerRef}
				>
					<XToastProvider value={{ underlined: under, show, replace, clear }}>
						<XMessages
							life={Math.max(life ?? 0, 3000)}
							closable={closable}
							color={color}
							outline={outline}
							square={square}
							underlined={underlined}
							sticky={false}
							ref={mesgs}
						/>
					</XToastProvider>
				</div>,
				document.body,
			);
		},
	),
);
