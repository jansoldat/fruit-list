import { useEffect, useState } from 'react';
import type { FruitItem, Sorting } from '../types';

const getSortItem = (item: FruitItem, key: string) =>
	key === 'calories' ? item.nutritions.calories : item.name;

export const useSorting = (data?: FruitItem[]) => {
	const [sorting, setSorting] = useState<Sorting>('none');
	const [sortedData, setSortedData] = useState<FruitItem[] | undefined>(data);

	const handleSortChange = (newSort: Sorting) => {
		setSorting(newSort);
	};

	const sortData = (arr: FruitItem[], sorting: Sorting) => {
		if (sorting === 'none') return arr;

		return arr.slice().sort((a, b) => {
			const [key, direction] = sorting.split('-');
			const valA = getSortItem(a, key);
			const valB = getSortItem(b, key);

			if (valA < valB) return direction === 'asc' ? -1 : 1;
			if (valA > valB) return direction === 'asc' ? 1 : -1;
			return 0;
		});
	};

	useEffect(() => {
		if (!data) return;
		setSortedData(sortData(data, sorting));
	}, [data, sorting]);

	return { sorting, handleSortChange, sortedData };
};
