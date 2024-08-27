import { useState, useMemo } from 'react';
import { useDebounce } from 'use-debounce';
import type { FruitItem } from '../types';

// Utility function to filter data based on search term
const filterDataByName = (arr: FruitItem[], searchTerm: string) => {
	const lowerCasedTerm = searchTerm.trim().toLowerCase();
	if (!lowerCasedTerm) return arr;

	return arr.filter(item =>
		item.name.trim().toLowerCase().includes(lowerCasedTerm),
	);
};

export const useSearch = (data: FruitItem[] = []) => {
	const [searchTerm, setSearchTerm] = useState<string>('');

	const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

	const filteredData = useMemo(
		() => filterDataByName(data, debouncedSearchTerm),
		[data, debouncedSearchTerm],
	);

	const handleSearchChange = (newTerm: string) => {
		setSearchTerm(newTerm);
	};

	return { searchTerm, handleSearchChange, filteredData };
};
