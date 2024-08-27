import { create } from 'zustand';

interface SelectedItem {
	name: string;
	calories: number;
	count: number;
}

interface SelectedState {
	selected: Map<number, SelectedItem>;
	add: (id: number, name: string, calories: number) => void;
	remove: (id: number) => void;
	addMultiple: (
		items: { id: number; name: string; calories: number }[],
	) => void;
	removeAll: () => void;
	removeMultiple: (ids: number[]) => void;
}

export const useSelectedFruit = create<SelectedState>(set => ({
	selected: new Map(),

	add: (id: number, name: string, calories: number) => {
		set(state => {
			const newSelected = new Map(state.selected);
			if (newSelected.has(id)) {
				const existing = newSelected.get(id)!;
				newSelected.set(id, { ...existing, count: existing.count + 1 });
			} else {
				newSelected.set(id, { name, calories, count: 1 });
			}
			return { selected: newSelected };
		});
	},

	remove: (id: number) => {
		set(state => {
			const newSelected = new Map(state.selected);
			if (newSelected.has(id)) {
				const existing = newSelected.get(id)!;
				if (existing.count > 1) {
					newSelected.set(id, { ...existing, count: existing.count - 1 });
				} else {
					newSelected.delete(id);
				}
			}
			return { selected: newSelected };
		});
	},

	addMultiple: (items: { id: number; name: string; calories: number }[]) => {
		set(state => {
			const newSelected = new Map(state.selected);

			items.forEach(({ id, name, calories }) => {
				if (newSelected.has(id)) {
					const existing = newSelected.get(id)!;
					newSelected.set(id, { ...existing, count: existing.count + 1 });
				} else {
					newSelected.set(id, { name, calories, count: 1 });
				}
			});

			return { selected: newSelected };
		});
	},

	removeAll: () => {
		set({ selected: new Map() });
	},

	removeMultiple: (ids: number[]) => {
		set(state => {
			const newSelected = new Map(state.selected);
			ids.forEach(id => newSelected.delete(id));
			return { selected: newSelected };
		});
	},
}));
