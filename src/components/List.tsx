import type { UseQueryResult } from '@tanstack/react-query';
import { useMemo, type FC } from 'react';
import type { FruitItem } from '../types';
import { FruitListItem } from './FruitListItem';
import { Error50x } from './ui';
import { cn } from '../common/utils';
import { useSelectedFruit } from '../hooks/useSelectedFruit';
import { useTranslation } from 'react-i18next'; // Add this import

export type ListProps = Pick<
	UseQueryResult<FruitItem[], Error>,
	'data' | 'status'
> & {
	className?: string;
};

export const List: FC<ListProps> = ({ data, status, className }) => {
	const { selected, add, remove } = useSelectedFruit();
	const { t } = useTranslation(); // Add this line

	const loadingArray = useMemo<{ id: number }[]>(
		() => new Array(16).fill(null).map(() => ({ id: Math.random() })),
		[],
	);

	const handleAdd = (name: string, calories: number) => (id: number) => {
		add(id, name, calories);
	};

	const handleDelete = (id: number) => {
		remove(id);
	};

	if (status === 'error') return <Error50x />;

	return (
		<ul className={cn('grid grid-cols-1 gap-4', className)}>
			{status === 'pending' ? (
				loadingArray.map(fruit => <FruitListItem key={fruit.id} isLoading />)
			) : data && data.length > 0 ? (
				data.map(fruit => {
					const count = selected.get(fruit.id)?.count;
					return (
						<FruitListItem
							key={fruit.id}
							count={count}
							fruit={fruit}
							onAdd={handleAdd(fruit.name, fruit.nutritions.calories)}
							onDelete={handleDelete}
						/>
					);
				})
			) : (
				<li className="w-full text-center text-lg text-primary">
					{t('list.no-data')}
				</li>
			)}
		</ul>
	);
};
