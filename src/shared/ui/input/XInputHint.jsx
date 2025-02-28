import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useId } from '../../hooks/useId';
import { useXInputControlContext } from './XInputControlContext';
import './style.css';

export function XInputHint({ id, className, children, ...props }) {
	if (!children) {
		return null;
	}
	const ctx = useXInputControlContext();
	const uid = useId(id || ctx?.hintId);
	return (
		<p
			id={uid}
			{...props}
			className={classNames('x-input-message x-input-message--hint', className)}
		>
			{children === ' ' ? '\u00A0' : children}
		</p>
	);
}

XInputHint.propTypes = {
	id: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
};
