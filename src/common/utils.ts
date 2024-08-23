import { clsx, type ClassValue } from 'clsx';
import { extendedTheme } from 'src/extendedTheme';
import { extendTailwindMerge } from 'tailwind-merge';

export const isProduction = import.meta.env.MODE === 'production';

const customTwMerge = extendTailwindMerge<string, string>({
	extend: {
		theme: {
			colors: Object.keys(extendedTheme.colors),
			borderRadius: Object.keys(extendedTheme.borderRadius),
		},
		classGroups: {
			'font-size': [
				{
					text: Object.keys(extendedTheme.fontSize),
				},
			],
			animate: [
				{
					animate: Object.keys(extendedTheme.animation),
				},
			],
		},
	},
});

export function cn(...inputs: ClassValue[]) {
	return customTwMerge(clsx(inputs));
}
