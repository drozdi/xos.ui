import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useId } from '../../hooks/useId';
import { useXInputControlContext } from './XInputControlContext';
import './style.css';

export function XInputError({ id, className, children, ...props }) {
	if (!children) {
		return null;
	}
	const ctx = useXInputControlContext();
	const uid = useId(id || ctx?.errorId);
	return (
		<p
			id={uid}
			{...props}
			className={classNames('x-input-message x-input-message--error', className)}
		>
			{children}
		</p>
	);
}

XInputError.propTypes = {
	id: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
};
