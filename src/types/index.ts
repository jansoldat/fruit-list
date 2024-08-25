interface Nutritions {
	carbohydrates: number;
	protein: number;
	fat: number;
	calories: number;
	sugar: number;
}

export interface GroupInfo {
	family: string;
	genus: string;
	order: string;
}

export interface FruitItem extends GroupInfo {
	name: string;
	id: number;
	nutritions: Nutritions;
}

export type GroupKey = keyof GroupInfo | 'none';

export type Sorting =
	| 'none'
	| 'name-asc'
	| 'name-desc'
	| 'calories-asc'
	| 'calories-desc';
