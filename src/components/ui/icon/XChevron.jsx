import PropTypes from 'prop-types';
import { XIcon } from './XIcon';
export function XChevron(props) {
	return <XIcon {...props}>mdi-chevron-right</XIcon>;
}

XChevron.propTypes = {
	className: PropTypes.string,
};
