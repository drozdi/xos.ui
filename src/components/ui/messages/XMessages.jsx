import classNames from 'classnames';
import PropTypes from 'prop-types';
import { forwardRef, memo, useImperativeHandle, useRef, useState } from 'react';
import { isArray } from '../../../utils/is';
import { useId } from '../../hooks/useId';
import { XMessage } from '../message';
import './style.css';
import { XMessagesProvider } from './XMessagesContext';

let messageIdx = 0;

export const XMessages = memo(
	forwardRef(function XMessagesFn({ id, className, row, ...def }, ref) {
		const uid = useId(id);
		const [list, setList] = useState([]);
		const elementRef = useRef(null);

		const clear = () => setList([]);
		const show = (message) => {
			if (!message) {
				return;
			}
			setList((current) => assignList(current, message, true));
		};
		const replace = (message) => {
			setList((current) => assignList(current, message, false));
		};
		const assignList = (current, message, copy = true) => {
			let messages = [];
			if (isArray(message)) {
				const multipleMessages = message.reduce((acc, message) => {
					acc.push({
						...def,
						...message,
						_pId: messageIdx++,
					});
					return acc;
				}, []);
				if (copy) {
					messages = [...current, ...multipleMessages];
				} else {
					messages = multipleMessages;
				}
			} else {
				if (copy) {
					messages = [
						...current,
						{
							...def,
							...message,
							_pId: messageIdx++,
						},
					];
				} else {
					messages = [
						{
							...def,
							...message,
							_pId: messageIdx++,
						},
					];
				}
			}
			return messages;
		};
		const context = {
			remove: (_pId) => {
				setList((n) => n.filter((item) => item._pId !== _pId));
			},
		};

		useImperativeHandle(ref, () => ({
			show,
			replace,
			clear,
			getElement: () => elementRef.current,
		}));

		return (
			<div
				id={uid}
				className={classNames(
					'x-messages',
					{
						'x-messages--row': row,
					},
					className,
				)}
				ref={elementRef}
			>
				<XMessagesProvider value={context}>
					{list.map((message) => (
						<XMessage key={message._pId} {...message} />
					))}
				</XMessagesProvider>
			</div>
		);
	}),
);

XMessages.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	row: PropTypes.bool,
	icon: PropTypes.node,
	flat: PropTypes.bool,
	color: PropTypes.string,
	outline: PropTypes.bool,
	square: PropTypes.bool,
	underlined: PropTypes.oneOf(['', 'top', 'bottom', 'left', 'right']),
	filled: PropTypes.bool,
	closable: PropTypes.bool,
	loading: PropTypes.bool,
	life: PropTypes.number,
	sticky: PropTypes.bool,
};
