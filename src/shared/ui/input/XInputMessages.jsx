import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useXInputControlContext } from './XInputControlContext';
import './style.css';

export function XInputMessages({
	className,
	children,
	hideMessage,
	error,
	hideHint,
	...props
}) {
	const ctx = useXInputControlContext();

	return (
		!hideMessage && (
			<div
				{...props}
				className={classNames('x-input-messages', {
					'x-input-messages--hint': !error && !hideHint,
					'x-input-messages--error': error,
				})}
				role="alert"
				aria-live="polite"
			>
				{children}
			</div>
		)
	);
}

XInputMessages.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	hideMessage: PropTypes.bool,
	hideHint: PropTypes.bool,
	error: PropTypes.bool,
};
