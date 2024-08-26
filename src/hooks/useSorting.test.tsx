/**
 * @vitest-environment jsdom
 */

import { renderHook, act } from '@testing-library/react';
import { useSorting } from './useSorting';
import type { FruitItem } from '../types';
import { describe, expect, it } from 'vitest';

const mockData: FruitItem[] = [
	{
		id: 1,
		name: 'Apple',
		family: 'Rosaceae',
		genus: 'Malus',
		order: 'Rosales',
		nutritions: {
			carbohydrates: 13.8,
			protein: 0.3,
			fat: 0.2,
			calories: 52,
			sugar: 10.4,
		},
	},
	{
		id: 2,
		name: 'Banana',
		family: 'Musaceae',
		genus: 'Musa',
		order: 'Zingiberales',
		nutritions: {
			carbohydrates: 22.8,
			protein: 1.1,
			fat: 0.3,
			calories: 96,
			sugar: 12.2,
		},
	},
	{
		id: 3,
		name: 'Cherry',
		family: 'Rosaceae',
		genus: 'Prunus',
		order: 'Rosales',
		nutritions: {
			carbohydrates: 16,
			protein: 1,
			fat: 0.3,
			calories: 63,
			sugar: 12.8,
		},
	},
];

describe('useSorting', () => {
	it('should return unsorted data when sorting is set to "none"', () => {
		const { result } = renderHook(() => useSorting(mockData));

		expect(result.current.sortedData).toEqual(mockData);
	});

	it('should sort data by name in ascending order', () => {
		const { result } = renderHook(() => useSorting(mockData));

		act(() => {
			result.current.handleSortChange('name-asc');
		});

		expect(result.current.sortedData).toEqual([
			mockData[0], // Apple
			mockData[1], // Banana
			mockData[2], // Cherry
		]);
	});

	it('should sort data by name in descending order', () => {
		const { result } = renderHook(() => useSorting(mockData));

		act(() => {
			result.current.handleSortChange('name-desc');
		});

		expect(result.current.sortedData).toEqual([
			mockData[2], // Cherry
			mockData[1], // Banana
			mockData[0], // Apple
		]);
	});

	it('should sort data by calories in ascending order', () => {
		const { result } = renderHook(() => useSorting(mockData));

		act(() => {
			result.current.handleSortChange('calories-asc');
		});

		expect(result.current.sortedData).toEqual([
			mockData[0], // Apple (52 calories)
			mockData[2], // Cherry (63 calories)
			mockData[1], // Banana (96 calories)
		]);
	});

	it('should sort data by calories in descending order', () => {
		const { result } = renderHook(() => useSorting(mockData));

		act(() => {
			result.current.handleSortChange('calories-desc');
		});

		expect(result.current.sortedData).toEqual([
			mockData[1], // Banana (96 calories)
			mockData[2], // Cherry (63 calories)
			mockData[0], // Apple (52 calories)
		]);
	});

	it('should handle empty data', () => {
		const { result } = renderHook(() => useSorting([]));

		expect(result.current.sortedData).toEqual([]);
	});

	it('should handle changing sorting multiple times', () => {
		const { result } = renderHook(() => useSorting(mockData));

		act(() => {
			result.current.handleSortChange('name-asc');
		});
		expect(result.current.sortedData[0].name).toBe('Apple');

		act(() => {
			result.current.handleSortChange('calories-desc');
		});
		expect(result.current.sortedData[0].name).toBe('Banana');

		act(() => {
			result.current.handleSortChange('none');
		});
		expect(result.current.sortedData).toEqual(mockData);
	});
});
