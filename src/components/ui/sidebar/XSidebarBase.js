import { ComponentBase } from '../componentbase/ComponentBase';

export const XSidebarBase = ComponentBase.extend({
	defaultProps: {
		type: 'left',
		mini: false,
		miniToOverlay: false,
		open: false,
		overlay: false,
		breakpoint: null,

		width: 300,
		minWidth: 56,
		maxWidth: 400,

		onMouseEnter: () => {},
		onMouseLeave: () => {},
		onResize: () => {},
		onMini: () => {},
		onToggle: () => {},
	},
});
