import type { UndefinedInitialDataOptions } from '@tanstack/react-query';
import axios from 'axios';
import type { FruitItem } from 'src/types';

export const getAllFruitQueryOptions: () => UndefinedInitialDataOptions<
	FruitItem[]
> = () => ({
	queryKey: ['fruitData'],
	queryFn: async () => {
		const res = await axios.get<FruitItem[]>(
			`${process.env.API_ENDPOINT}/api/fruit/all`,
		);
		return res.data;
	},
});
