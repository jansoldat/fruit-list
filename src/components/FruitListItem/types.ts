import type { FruitItem } from '~/src/types';

export type FruitListItemProps =
	| {
			isLoading: true;
			fruit?: never;
			count?: never;
			onDelete?: never;
			onAdd?: never;
	  }
	| {
			isLoading?: never;
			fruit: FruitItem;
			count?: number;
			onDelete: (id: number) => void;
			onAdd: (id: number) => void;
	  };
