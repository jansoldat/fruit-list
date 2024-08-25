import { describe, it, expect } from 'vitest';
import { convertArrayToMap } from './utils';

describe('convertArrayToMap', () => {
	const data = [
		{
			name: 'Persimmon',
			id: 52,
			family: 'Ebenaceae',
			order: 'Rosales',
			genus: 'Diospyros',
		},
		{
			name: 'Strawberry',
			id: 3,
			family: 'Rosaceae',
			order: 'Rosales',
			genus: 'Fragaria',
		},
		{
			name: 'Banana',
			id: 1,
			family: 'Musaceae',
			order: 'Zingiberales',
			genus: 'Musa',
		},
		{
			name: 'Tomato',
			id: 5,
			family: 'Solanaceae',
			order: 'Solanales',
			genus: 'Solanum',
		},
	];

	it('should group items by a unique key (id)', () => {
		const result = convertArrayToMap(data, 'id');
		expect(result.size).toBe(4); // There are 4 unique ids
		expect(result.get(52)).toEqual([data[0]]);
		expect(result.get(3)).toEqual([data[1]]);
		expect(result.get(1)).toEqual([data[2]]);
		expect(result.get(5)).toEqual([data[3]]);
	});

	it('should group items by a non-unique key (order)', () => {
		const result = convertArrayToMap(data, 'order');
		expect(result.size).toBe(3); // There are 3 unique orders
		expect(result.get('Rosales')).toEqual([data[0], data[1]]);
		expect(result.get('Zingiberales')).toEqual([data[2]]);
		expect(result.get('Solanales')).toEqual([data[3]]);
	});

	it('should return an empty Map if the input array is empty', () => {
		const result = convertArrayToMap([], 'id');
		expect(result.size).toBe(0);
	});

	it('should correctly type the Map when different keys are used', () => {
		const resultById = convertArrayToMap(data, 'id');
		const resultByFamily = convertArrayToMap(data, 'family');

		expect(resultById.get(52)?.[0].name).toBe('Persimmon');
		expect(resultByFamily.get('Rosaceae')?.[0].name).toBe('Strawberry');
	});

	it('should sort items within each group when shouldSort is true', () => {
		const result = convertArrayToMap(data, 'order', true);
		expect(result.get('Rosales')).toEqual([data[0], data[1]]);
		expect(result.get('Zingiberales')).toEqual([data[2]]);
		expect(result.get('Solanales')).toEqual([data[3]]);

		//  Verifying the sorting by 'id'
		const resultById = convertArrayToMap(data, 'id', true);
		expect(resultById.get(52)).toEqual([data[0]]);
		expect(resultById.get(3)).toEqual([data[1]]);
		expect(resultById.get(1)).toEqual([data[2]]);
		expect(resultById.get(5)).toEqual([data[3]]);
	});
});
