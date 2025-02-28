import { useLayoutEffect, useState } from 'react';
import {
	SCREEN_LG,
	SCREEN_MD,
	SCREEN_SM,
	SCREEN_XL,
	SCREEN_XXL,
} from '../const/breakpoints';

export const useWindowResizeWidth = () => {
	const [width, setWidth] = useState(window.innerWidth);

	useLayoutEffect(() => {
		const onResize = (event) => {
			setWidth(event.target.innerWidth);
		};
		window.addEventListener('resize', onResize);
		return () => {
			window.removeEventListener('resize', onResize);
		};
	}, []);

	return {
		width,
		isScreenSm: width >= SCREEN_SM,
		isScreenMd: width >= SCREEN_MD,
		isScreenLg: width >= SCREEN_LG,
		isScreenXl: width >= SCREEN_XL,
		isScreenXxl: width >= SCREEN_XXL,
	};
};
