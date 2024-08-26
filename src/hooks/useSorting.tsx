import { useMemo, useState } from 'react';
import type { FruitItem, Sorting } from '../types';

const getSortValue = (item: FruitItem, key: keyof FruitItem | 'calories') => {
	if (key === 'calories') {
		return item.nutritions.calories;
	}
	return item.name.trim().toLowerCase();
};

const sortData = (arr: FruitItem[], sorting: Sorting) => {
	if (sorting === 'none') return arr;

	const [key, direction] = sorting.split('-') as [
		keyof FruitItem | 'calories',
		'asc' | 'desc',
	];

	return [...arr].sort((a, b) => {
		const valA = getSortValue(a, key);
		const valB = getSortValue(b, key);

		if (valA < valB) return direction === 'asc' ? -1 : 1;
		if (valA > valB) return direction === 'asc' ? 1 : -1;
		return 0;
	});
};

export const useSorting = (data: FruitItem[] = []) => {
	const [sorting, setSorting] = useState<Sorting>('none');

	const sortedData = useMemo(() => sortData(data, sorting), [data, sorting]);

	const handleSortChange = (newSort: Sorting) => {
		setSorting(newSort);
	};

	return { sorting, handleSortChange, sortedData };
};
