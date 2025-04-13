import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
const StorageKey = "features-color-theme";

/**
 * ThemeContext is the context of the theme.
 */
export const ThemeContext = createContext(undefined);

/**
 * Хук useTheme возвращает контекст темы.
 * @returns {Object} - Контекст темы.
 */
export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error(
			'You can use "useTheme" hook only within a <ThemeProvider> component.'
		);
	}
	return context;
}

/**
 * Функция getTheme возвращает текущую тему из localStorage.
 * @returns {string} - Текущая тема.
 */
function getTheme() {
	const theme = localStorage.getItem(StorageKey);
	if (theme) return theme;

	const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	return isDark ? "dark" : "light";
}

/**
 * Компонент ThemeProvider
 * @param {Object} props - свойства
 * @param {React.ReactNode} props.children - дочерние элементы
 * @returns {React.ReactElement} элемент ThemeProvider
 */
export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState(getTheme);

	useEffect(() => {
		const isDark = theme === "dark";
		const root = window.document.documentElement;
		localStorage.setItem(StorageKey, theme);
		document.body.setAttribute("data-theme", theme);
		root.classList.remove(isDark ? "light" : "dark");
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

ThemeProvider.propTypes = {
	children: PropTypes.node,
};

/**
 * Компонент ThemeToggler
 * @returns {React.ReactElement} элемент ThemeProviderToggler
 */
export function ThemeToggler() {
	const { theme, setTheme } = useTheme();
	function isDark() {
		return theme === "dark";
	}
	return (
		<label className="text-primary">
			<input
				type="checkbox"
				checked={isDark()}
				onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
			></input>
			Dark Mode
		</label>
	);
}
