import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from 'react';

interface ThemeContextProps {
	isDarkMode: boolean;
	setThemePreference: (preference: 'system' | 'light' | 'dark') => void;
	currentThemePreference: 'system' | 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Helper function to detect system dark mode preference
const getSystemPreference = () =>
	window.matchMedia('(prefers-color-scheme: dark)').matches;

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	// Retrieve stored theme preference from localStorage
	const [currentThemePreference, setCurrentThemePreference] = useState<
		'system' | 'light' | 'dark'
	>(
		() =>
			(localStorage.getItem('theme') as 'system' | 'light' | 'dark') ||
			'system',
	);

	// Determine the initial theme based on preference or system setting
	const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
		if (currentThemePreference === 'system') {
			return getSystemPreference();
		}
		return currentThemePreference === 'dark';
	});

	// Update the theme based on system changes when 'system' is selected
	useEffect(() => {
		const updateTheme = () => {
			const newIsDarkMode =
				currentThemePreference === 'system'
					? getSystemPreference()
					: currentThemePreference === 'dark';
			setIsDarkMode(newIsDarkMode);
			document.documentElement.classList.toggle('dark', newIsDarkMode);
		};

		updateTheme();

		const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
		darkThemeMq.addEventListener('change', updateTheme);
		return () => {
			darkThemeMq.removeEventListener('change', updateTheme);
		};
	}, [currentThemePreference]);

	// Function to set theme preference to 'system', 'light', or 'dark'
	const setThemePreference = (preference: 'system' | 'light' | 'dark') => {
		setCurrentThemePreference(preference);
		localStorage.setItem('theme', preference);

		if (preference === 'system') {
			setIsDarkMode(getSystemPreference());
		} else {
			setIsDarkMode(preference === 'dark');
		}
	};

	return (
		<ThemeContext.Provider
			value={{
				isDarkMode,
				setThemePreference,
				currentThemePreference,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};
