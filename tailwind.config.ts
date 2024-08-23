import { type Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme.js';
import { extendedTheme } from './src/extendedTheme';

export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	container: {
		center: true,
		padding: '2rem',
		screens: {
			'2xl': '1400px',
		},
	},
	theme: {
		extend: {
			...extendedTheme,
			fontFamily: {
				sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
} satisfies Config;
