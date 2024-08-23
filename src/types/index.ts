type Nutritions = {
	carbohydrates: number;
	protein: number;
	fat: number;
	calories: number;
	sugar: number;
};

export type FruitItem = {
	name: string;
	id: number;
	family: string;
	genus: string;
	order: string;
	nutritions: Nutritions;
};
