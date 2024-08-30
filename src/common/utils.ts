import { clsx, type ClassValue } from 'clsx';
import { extendedTheme } from 'src/extendedTheme';
import { extendTailwindMerge } from 'tailwind-merge';

export const isProduction = import.meta.env.MODE === 'production';

function formatColors() {
	const colors = [];
	for (const [key, color] of Object.entries(extendedTheme.colors)) {
		if (typeof color === 'string') {
			colors.push(key);
		} else {
			const colorGroup = Object.keys(color).map(subKey =>
				subKey === 'DEFAULT' ? '' : subKey,
			);
			colors.push({ [key]: colorGroup });
		}
	}
	return colors;
}

const customTwMerge = extendTailwindMerge<string, string>({
	extend: {
		theme: {
			colors: formatColors(),
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

export const convertArrayToMap = <
	T extends { [K in P]: unknown },
	P extends keyof T,
>(
	arr: T[],
	key: P,
	shouldSort: boolean = false,
): Map<T[P], Extract<T, Record<P, T[P]>>[]> => {
	const map = new Map<T[P], Extract<T, Record<P, T[P]>>[]>();

	for (const item of arr) {
		const itemKey = item[key];
		if (!map.has(itemKey)) {
			map.set(itemKey, []);
		}
		map.get(itemKey)!.push(item as Extract<T, Record<P, T[P]>>);
	}

	if (shouldSort) {
		return new Map(
			[...map.entries()].sort(([keyA], [keyB]) => {
				if (typeof keyA === 'string' && typeof keyB === 'string') {
					return keyA.trim().localeCompare(keyB.trim());
				}

				if (keyA < keyB) return -1;
				if (keyA > keyB) return 1;
				return 0;
			}),
		);
	}

	return map;
};
