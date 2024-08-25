import type { FruitItem } from '~/src/types';

export type FruitListItemProps =
	| {
			isLoading: true;
			fruit?: never;
			selected?: never;
			onDelete?: never;
			onAdd?: never;
	  }
	| {
			isLoading?: never;
			fruit: FruitItem;
			selected: Map<number, number>;
			onDelete: () => void;
			onAdd: () => void;
	  };
