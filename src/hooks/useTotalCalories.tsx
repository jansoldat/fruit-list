import { create } from 'zustand';
import { useSelectedFruit } from './useSelectedFruit';

interface TotalCaloriesState {
	totalCalories: number;
}

export const useTotalCalories = create<TotalCaloriesState>(set => {
	const updateTotalCalories = () => {
		const { selected } = useSelectedFruit.getState();
		const newTotalCalories = Array.from(selected.values()).reduce(
			(total, item) => total + item.calories * item.count,
			0,
		);
		set({ totalCalories: newTotalCalories });
	};

	useSelectedFruit.subscribe(updateTotalCalories);

	return {
		totalCalories: 0,
	};
});
