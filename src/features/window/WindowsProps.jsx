import { createContext, useContext } from "react";

export const WindowPropsContext = createContext({});

export const WindowProps = ({ children, ...props }) => {
	return (
		<WindowPropsContext.Provider value={props}>
			{children}
		</WindowPropsContext.Provider>
	);
};

export const useProps = (props) => {
	return {
		...props,
		...useContext(WindowPropsContext),
	};
};
