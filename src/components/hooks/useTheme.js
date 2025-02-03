import React, { createContext, useContext, useEffect, useState } from 'react';
const StorageKey = 'features-color-theme';

export const ThemeContext = createContext(undefined);
export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error(
			'You can use "useTheme" hook only within a <ThemeProvider> component.',
		);
	}
	return context;
};

const getTheme = () => {
	let theme = localStorage.getItem(StorageKey);
	if (!theme) {
		localStorage.setItem(StorageKey, 'light');
		theme = 'light';
	}
	return theme;
};

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState(getTheme);

	useEffect(() => {
		const isDark = theme === 'dark';
		const root = window.document.documentElement;
		localStorage.setItem(StorageKey, theme);
		document.body.setAttribute('data-theme', theme);
		root.classList.remove(isDark ? 'light' : 'dark');
		root.classList.add(theme);
	}, [theme]);

	return (
		<ThemeContext.Provider
			value={{
				theme,
				setTheme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
}
ThemeProvider.Toggler = function Toggler() {
	const { theme, setTheme } = useTheme();
	function isDark() {
		return theme === 'dark';
	}
	return (
		<>
			<label className="text-primary">
				<input
					type="checkbox"
					checked={isDark()}
					onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
				></input>
				Dark Mode
			</label>
		</>
	);
};
